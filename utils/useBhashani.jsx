import { useState, useContext } from 'react'
import axios from 'axios'
import { ToastContext } from '../../src/context/toastContext'
import { toast_actions, toast_types } from '../../src/components/shared/toast/utils/toast'
const BHASHINI_SOURCE_LANG = 'en'

export const useBhashiniApi = () => {
  const dispatch = useContext(ToastContext)
  const [asrRequest, setAsrRequest] = useState({
    callback_url: '',
    compute_call_authorization_key: '',
    compute_call_authorization_value: '',
    asr_service_id: '',
  })

  const withoutConfigRequest = async () => {
    const payload = {
      pipelineTasks: [
        {
          taskType: 'asr',
        },
      ],
      pipelineRequestConfig: {
        pipelineId: process.env.REACT_APP_PIPELINE_ID,
      },
    }
    const config = {
      headers: {
        ulcaApiKey: process.env.REACT_APP_ULCA_API_KEY,
        userID: process.env.REACT_APP_ULCA_USER_ID,
      },
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_ULCA_BASE_URL}${process.env.REACT_APP_MODEL_PIPELINE_ENDPOINT}`,
        payload,
        config,
      )

      const index = data?.pipelineResponseConfig[0].config.findIndex(
        (item) => item?.language.sourceLanguage === BHASHINI_SOURCE_LANG,
      )

      setAsrRequest({
        callback_url: data?.pipelineInferenceAPIEndPoint?.callbackUrl,
        compute_call_authorization_key: data?.pipelineInferenceAPIEndPoint?.inferenceApiKey?.name,
        compute_call_authorization_value: data?.pipelineInferenceAPIEndPoint?.inferenceApiKey?.value,
        asr_service_id: data?.pipelineResponseConfig[0].config[index].serviceId,
      })
    } catch (error) {
      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.error,
          message: 'Failed to refetch your request',
        },
      })
    }
  }

  const computeRequestASR = async (base64) => {
    const { callback_url, compute_call_authorization_key, compute_call_authorization_value, asr_service_id } =
      asrRequest

    const payload = {
      pipelineTasks: [
        {
          taskType: 'asr',
          config: {
            language: {
              sourceLanguage: BHASHINI_SOURCE_LANG,
            },
            serviceId: asr_service_id,
            audioFormat: 'wav',
            samplingRate: 16000,
          },
        },
      ],
      inputData: {
        audio: [
          {
            audioContent: base64,
          },
        ],
      },
    }

    const config = {
      headers: {
        Accept: '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        [compute_call_authorization_key]: compute_call_authorization_value,
      },
    }

    try {
      const { data } = await axios.post(callback_url, payload, config)
      return data
    } catch (error) {
      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.error,
          message: 'Failed to refetch your request',
        },
      })
    }
  }

  return { withoutConfigRequest, computeRequestASR }
}

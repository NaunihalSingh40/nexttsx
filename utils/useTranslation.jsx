import  { useState, useContext } from 'react'
import axios from 'axios'
import {ToastContext} from '../../src/context/toastContext'
import { toast_actions, toast_types } from '../../src/components/shared/toast/utils/toast'

const BHASHINI_SOURCE_LANG = 'en'
const BHASHINI_TARGET_LANG = 'pa'

export const useTranslationApi = () => {
  const dispatch = useContext(ToastContext)
  const [nmtRequest, setNmtRequest] = useState({
    callback_url: '',
    compute_call_authorization_key: '',
    compute_call_authorization_value: '',
    nmt_service_id: '',
  })

  const withoutConfigRequest = async () => {
    const payload = {
      pipelineTasks: [
        {
          taskType: 'translation',
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

      setNmtRequest({
        callback_url: data?.pipelineInferenceAPIEndPoint?.callbackUrl,
        compute_call_authorization_key: data?.pipelineInferenceAPIEndPoint?.inferenceApiKey?.name,
        compute_call_authorization_value: data?.pipelineInferenceAPIEndPoint?.inferenceApiKey?.value,
        nmt_service_id: data?.pipelineResponseConfig[0].config[index].serviceId,
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

  const computeRequestNMT = async (text) => {
    const { callback_url, compute_call_authorization_key, compute_call_authorization_value, nmt_service_id } =
      nmtRequest

    const payload = {
      pipelineTasks: [
        {
          taskType: 'translation',
          config: {
            language: {
              sourceLanguage: BHASHINI_SOURCE_LANG,
              targetLanguage: BHASHINI_TARGET_LANG,
            },
            serviceId: nmt_service_id,
          },
        },
      ],
      inputData: {
        input: [
          {
            source: text,
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
    } catch (e) {
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

  return { withoutConfigRequest, computeRequestNMT }
}

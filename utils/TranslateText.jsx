import React, {
  useState,
  // useEffect,
  useContext,
} from 'react'
import { useTranslationApi } from './useTranslation'
import { ToastContext } from '../../src/context/toastContext'
import { toast_actions, toast_types } from '../../src/components/shared/toast/utils/toast'

const NmtData = ({ textToTranslate }) => {
  const dispatch = useContext(ToastContext)
  const [translatedTexts, setTranslatedTexts] = useState({})
  const {
    // withoutConfigRequest,
    computeRequestNMT,
  } = useTranslationApi()

  // useEffect(() => {
  //   withoutConfigRequest()
  // }, [])

  const translateTexts = async () => {
    try {
      const translatedTextMap = {}

      // Iterate over each text in textToTranslate
      for (const key in textToTranslate) {
        if (textToTranslate.hasOwn(key)) {
          const text = textToTranslate[key]

          // Call computeRequestNMT for each text
          await computeRequestNMT(text).then((searchText) => {
            const translatedValue = searchText?.pipelineResponse[0]?.output[0]?.target
            translatedTextMap[key] = translatedValue
          })
        }
      }

      // Update the state with translated texts
      setTranslatedTexts(translatedTextMap)
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

  return (
    <div>
      {/* Render original and translated texts */}
      {Object.keys(textToTranslate).map((key) => (
        <div key={key}>
          <p>Original Text: {textToTranslate[key]}</p>
          <p>Translated Text: {translatedTexts[key]}</p>
        </div>
      ))}

      {/* Button to trigger translation */}
      <div onClick={translateTexts}>Translate All Texts</div>
    </div>
  )
}

export default NmtData

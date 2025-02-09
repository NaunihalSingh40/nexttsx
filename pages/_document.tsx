import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { AppProps } from 'next/app' // Import the correct type for App props

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    // Create a styled-components sheet to collect styles
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      // Render the page and collect styles
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props: AppProps) =>
            sheet.collectStyles(<App {...props} />), // Use AppProps to type props correctly
        })

      // Get the initial props for the document
      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {/* Add the styled-components styles to the head */}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add any other global metadata here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

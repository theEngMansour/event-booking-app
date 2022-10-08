import React, {useState, useEffect} from 'react';
import msgs from 'site-settings/site-translations';
import { IntlProvider } from 'react-intl';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)
  const locale = 'ar';

  useEffect(() => {
    setShowChild(true)
  }, [])

  if(!showChild){
    return null;
  }

  return (
    <IntlProvider locale={locale} messages={msgs[locale]}>
      {typeof window === 'undefined'? (<></>) : (<Component {...pageProps} />)}
    </IntlProvider>
  )
}
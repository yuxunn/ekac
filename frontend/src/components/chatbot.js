import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {

    const botpressScript = document.createElement('script');
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    botpressScript.async = true;

    const botpressConfigScript = document.createElement('script');
    botpressConfigScript.src = "https://mediafiles.botpress.cloud/b0fccfda-215f-4777-87cb-6ec3aa330ebc/webchat/config.js";
    botpressConfigScript.defer = true;

    document.body.appendChild(botpressScript);
    document.body.appendChild(botpressConfigScript);

    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(botpressConfigScript);
    };
  }, []);

  return <div id="botpress-webchat"></div>;
};

export default Chatbot;

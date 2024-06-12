import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const botpressScript = document.createElement('script');
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    botpressScript.async = true;

    botpressScript.onload = () => {
      const botpressConfigScript = document.createElement('script');
      botpressConfigScript.src = "https://mediafiles.botpress.cloud/b0fccfda-215f-4777-87cb-6ec3aa330ebc/webchat/config.js";
      document.body.appendChild(botpressConfigScript);

      return () => {
        document.body.removeChild(botpressConfigScript);
      };
    };

    document.body.appendChild(botpressScript);

    return () => {
      document.body.removeChild(botpressScript);
    };
  }, []);

  return <div id="botpress-webchat"></div>;
};

export default Chatbot;

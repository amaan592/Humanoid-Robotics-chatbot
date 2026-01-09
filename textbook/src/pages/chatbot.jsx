import React from 'react';
import Layout from '@theme/Layout';
import Chatbot from '@site/src/components/Chatbot';

export default function ChatbotPage() {
  return (
    <Layout title="Textbook Assistant" description="Interactive chatbot for the Physical AI & Humanoid Robotics textbook">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--12">
            <h1>Textbook Assistant</h1>
            <p>
              Ask questions about the Physical AI & Humanoid Robotics content. The assistant will provide answers 
              based on the textbook material with proper source attribution.
            </p>
            
            <div style={{ height: '600px', marginTop: '20px' }}>
              <Chatbot apiEndpoint={process.env.REACT_APP_API_ENDPOINT || '/api/query'} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
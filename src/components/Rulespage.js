import React, { useState } from 'react';
import './styles/Rulespage.css'; // Ensure the path is correct

const accordionData = [
  {
    id: 1,
    title: 'What is Expecto Patronum?',
    content: 'E.P is an exciting game designed to challenge your ability to interact with large language models (LLMs).'
  },
  {
    id: 2,
    title: 'What should I do?',
    content: 'Your goal is to trick Expecto into revealing the secret password for each level. However, Expecto will level up each time you guess the password.'
  },
  {
    id: 3,
    title: 'How many levels are there?',
    content: '8 levels'
  },
  {
    id: 4,
    title: 'Additional Info',
    content: 'Some more details about the game.'
  }
];

const RulesPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="rules-container">
      <div className="accordion-container animate__animated animate__fadeInLeft">
        {accordionData.map((item, index) => (
          <div
            key={item.id}
            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div className="accordion-title animate__animated animate__fadeInRightBig" onClick={() => handleToggle(index)}>
              <span className="accordion-number animate__animated animate__fadeInLeft">{item.id}</span>
              {item.title}
            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="button-container animate__animated animate__fadeInUpBig">
        <a className="btn2 " href="/login">I am ready !!</a>
      </div>
    </div>
  );
};

export default RulesPage;

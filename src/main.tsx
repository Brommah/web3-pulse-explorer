
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create custom event listeners for cross-component communication
document.addEventListener('topic-click', (event: any) => {
  const { topicId } = event.detail;
  console.log('Custom topic click event received:', topicId);
  // Find the topic in the DOM and programmatically click it
  setTimeout(() => {
    const topicCards = document.querySelectorAll('[data-topic-id]');
    topicCards.forEach(card => {
      if ((card as HTMLElement).dataset.topicId === topicId) {
        (card as HTMLElement).click();
      }
    });
  }, 0);
});

document.addEventListener('user-click', (event: any) => {
  const { userId } = event.detail;
  console.log('Custom user click event received:', userId);
  // Find the user in the DOM and programmatically click it
  setTimeout(() => {
    const userCards = document.querySelectorAll('[data-user-id]');
    userCards.forEach(card => {
      if ((card as HTMLElement).dataset.userId === userId) {
        (card as HTMLElement).click();
      }
    });
  }, 0);
});

createRoot(document.getElementById("root")!).render(<App />);

import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import ChatPageLayout from './pages/ChatPageLayout';
import SystemPrompt from './pages/SystemPrompt';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="012aichat">
          <Route index element={<Home />} />
          <Route path="chat" element={<ChatPageLayout />} />
          <Route path="systemprompt" element={<SystemPrompt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

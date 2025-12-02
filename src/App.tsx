// Файл: src/App.jsx

import { HomePage } from './pages/home/HomePage';

function App() {
    // App — это самый главный компонент, который оборачивает всё приложение.
    // Пока что он просто отображает нашу единственную страницу.
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 items-center">
            <HomePage />
        </div>
    );
}

export default App;
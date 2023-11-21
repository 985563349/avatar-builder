import { Configurator } from './components/configurator';

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-slate-300">
      <div className="p-6 text-right">
        <button className="transition-colors rounded-xl px-6 py-3 text-lg text-white bg-teal-500 hover:bg-teal-600">
          Download
        </button>
      </div>

      <div className="w-[100vw] h-[100vw] xl:w-[calc(100vh-440px)] xl:h-[calc(100vh-440px)] mx-auto" />

      <Configurator />
    </div>
  );
}

export default App;

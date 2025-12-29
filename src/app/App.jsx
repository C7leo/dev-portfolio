import Home from "../ui/pages/Home.jsx";
import CustomCursor from './components/CustomCursor';
import { I18nProvider } from "../i18n.jsx";

export default function App() {
   return (
    <I18nProvider>
      <CustomCursor />
      <Home />
    </I18nProvider>
  );
}

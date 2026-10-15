import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "TaskFlow | Gerenciador de Tarefas",
  description:
    "Aplicação web para gerenciamento e acompanhamento de tarefas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
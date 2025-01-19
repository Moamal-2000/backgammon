import Header from "@/Components/Header/Header";
import Navigator from "@/Components/Navigator/Navigator";
import "../Styles/globals.scss";
import RootProviders from "./RootProviders";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <RootProviders>
      <html lang="en">
        <body>
          <Header />

          <div className="container">
            <Navigator />
            {children}
          </div>
        </body>
      </html>
    </RootProviders>
  );
}

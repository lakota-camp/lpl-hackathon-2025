import { useTheme } from "@/components/theme-provider";
import logoBlue from "@/assets/lpl-blue.png";
import logoWhite from "@/assets/lpl-white.png";

export function Logo() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <img
          src={logoBlue}
          alt="LPL Financial Logo White"
          className="h-8 w-auto"
        />
      ) : (
        <img
          src={logoWhite}
          alt="LPL Financial Logo Blue"
          className="h-8 w-auto"
        />
      )}
    </>
  );
}

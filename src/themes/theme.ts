export type Theme = "default";

const allThemes: Record<Theme, string> = {
    default: "theme-default",
};

export default allThemes;

export const DEFAULT_BRAND: Theme = "default";

export const brandMetadata: Record<Theme, { title: string; description: string }> = {
    default: {
        title: "Default",
        description: "Tema padrão para a aplicação.",
    },
};

// TODO: preencher com os domínios reais de produção de cada marca assim que definidos.
export const brandDomains: Record<string, Theme> = {
    "default.example.com": "default",
};

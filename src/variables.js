export const servidor = process.env.NODE_ENV === "production"?
    "https://araozu.pro":
    "";
// export const servidor = "https://araozu.pro";

export const impr = process.env.NODE_ENV !== "production"? window.console.log: () => {};


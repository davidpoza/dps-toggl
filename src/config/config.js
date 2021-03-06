const config = {
    app_title: "dpsToggl",
    lang: "ES",
    project_colors: [
        "#09a9f4", "#c87bf6", "#eb548d", "#fa8e49", "#c67639", "#51c93d", "#33bb9b", "#e19a86", "#3853b5", "#a354a6", "#f1c451", "#1f5615", "#89211f", "#e23c39", "#000000"
    ],
    records_per_page: 7,
    api_url: process.env.NODE_ENV === "production"? "https://togglapi.davidinformatico.com/api" :
        "http://localhost:3000/api"
};


export default config;
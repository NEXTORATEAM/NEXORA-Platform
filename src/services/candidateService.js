import api from "./api";

const candidateService = {
  // Upload candidate resume
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/candidate/upload-resume", formData);

    return response.data;
  },

  // Get all analyses belonging to the authenticated candidate
  getMyAnalyses: async () => {
    const response = await api.get("/candidate/my-analyses");

    return response.data;
  },
};

export default candidateService;
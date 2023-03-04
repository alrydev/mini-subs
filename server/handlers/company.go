package handlers

import (
	"encoding/json"
	"net/http"
	dto "server/dto/result"
	"server/repositories"

	"github.com/golang-jwt/jwt/v4"
)

type handlerCompany struct {
	CompanyRepository repositories.CompanyRepository
}

func HandlerCompany(CompanyRepository repositories.CompanyRepository) *handlerCompany {
	return &handlerCompany{CompanyRepository}
}

func (h *handlerCompany) FindCompanies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userinfo").(jwt.MapClaims)
	
	userRole := userInfo["role"]
	if userRole != "admin" {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: "unauthorized_"}
		json.NewEncoder(w).Encode(response)
		return
	}

	company, err := h.CompanyRepository.FindCompanies()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: company}
	json.NewEncoder(w).Encode(response)
}

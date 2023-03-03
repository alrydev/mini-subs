package handlers

import (
	"encoding/json"
	"net/http"
	dto "server/dto/result"
	subsdto "server/dto/subs"
	"server/repositories"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerSubs struct {
	SubsRepository repositories.SubsRepository
}

func HandlerSubs(SubsRepository repositories.SubsRepository) *handlerSubs {
	return &handlerSubs{SubsRepository}
}

func (h *handlerSubs) CreateSubs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	userInfo := r.Context().Value("userinfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	id_company := r.FormValue("idCompany")
	id_variant := id

	idCompany, err := strconv.Atoi(id_company)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	request := subsdto.SubscribeRequest{
		CompanyID: idCompany,
		VariantID: id_variant,
		UserID: userId,
	}

	data, err := h.SubsRepository.CreateSubs(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	responseSuccess := subsdto.SubscribeResponse{
		IdUser:      data.UserID,
		IdCompany:   data.ID,
		IdVariant:   data.VariantID,
		CompanyName: data.Name,
		Status:      data.Status,
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: responseSuccess}
	json.NewEncoder(w).Encode(response)
}

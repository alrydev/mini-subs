package handlers

import (
	"encoding/json"
	"net/http"
	dto "server/dto/result"
	variantdto "server/dto/variant"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
)

type handlerVariant struct {
	VariantRepository repositories.VariantRepository
}

func HandlerVariant(VariantRepository repositories.VariantRepository) *handlerVariant {
	return &handlerVariant{VariantRepository}
}

func (h *handlerVariant) FindVariant(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")


	variant, err := h.VariantRepository.FindVariant()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: variant}
	json.NewEncoder(w).Encode(response)
}


func (h *handlerVariant) CreateVariant(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userinfo").(jwt.MapClaims)
	
	userRole := userInfo["role"]
	if userRole != "admin" {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: "unauthorized_"}
		json.NewEncoder(w).Encode(response)
		return
	}

	price, _ := strconv.Atoi(r.FormValue("price"))
	subs_period, _ := strconv.Atoi(r.FormValue("subs_period") )
	request := variantdto.CreateVariantRequest{
		Name: r.FormValue("name"),
		SubscribePeriodDay: subs_period,
		Price: price,
		Desc: r.FormValue("desc"),

	}

	variant := models.Variant {
		Name: request.Name,
		SubscribePeriodDay: request.SubscribePeriodDay,
		Price: request.Price,
		Description: request.Desc,
	}

	data, err := h.VariantRepository.CreateVariant(variant)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}


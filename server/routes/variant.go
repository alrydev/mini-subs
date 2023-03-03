package routes

import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func VariantRoutes(r *mux.Router) {
	variantRepository := repositories.RepositoryVariant(mysql.DB)

	h := handlers.HandlerVariant(variantRepository)

	r.HandleFunc("/variant", h.FindVariant).Methods("GET")
}

package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func SubsRoutes(r *mux.Router) {
	subsRepository := repositories.RepositorySubs(mysql.DB)
	h := handlers.HandlerSubs(subsRepository)

	r.HandleFunc("/subscribe/{id}", middleware.Auth(h.CreateSubs)).Methods("PATCH")
}

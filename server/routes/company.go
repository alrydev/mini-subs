package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func CompanyRoutes(r *mux.Router) {
	companyRepository := repositories.RepositoryCompany(mysql.DB)

	h := handlers.HandlerCompany(companyRepository)

	r.HandleFunc("/companies", middleware.Auth(h.FindCompanies)).Methods("GET")
}

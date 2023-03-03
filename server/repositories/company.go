package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type CompanyRepository interface {
	FindCompanies() ([]models.Company, error)
}

func RepositoryCompany(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCompanies() ([]models.Company, error) {
	var companies []models.Company
	err := r.db.Preload("User").Preload("Variant").Find(&companies).Error

	return companies, err
}

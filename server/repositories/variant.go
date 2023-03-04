package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type VariantRepository interface {
	FindVariant() ([]models.Variant, error)
	CreateVariant(variant models.Variant) (models.Variant, error)
}

func RepositoryVariant(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindVariant() ([]models.Variant, error) {
	var variants []models.Variant
	err := r.db.Find(&variants).Error
	// err := r.db.Preload("User").Preload("Variant").Find(&variants).Error

	return variants, err
}

func (r *repository) CreateVariant(variant models.Variant) (models.Variant, error) {
	err := r.db.Create(&variant).Error
	return variant, err
}

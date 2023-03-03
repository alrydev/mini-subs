package repositories

import (
	subsdto "server/dto/subs"
	"server/models"

	"gorm.io/gorm"
)

type SubsRepository interface {
	CreateSubs(variantsubs subsdto.SubscribeRequest) (models.Company, error)
}

func RepositorySubs(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateSubs(variantsubs subsdto.SubscribeRequest) (models.Company, error) {

	// return data response
	var companies models.Company

	tx := r.db.Begin()
	if tx.Error != nil {
		return companies, tx.Error
	}

	variant := models.Variant{}
	if err := tx.Where("id = ?", variantsubs.VariantID).First(&variant).Error; err != nil {
		tx.Rollback()
		return companies, err
	}

	if err := tx.Where("id = ?", variantsubs.CompanyID).First(&companies).Error; err != nil {
		tx.Rollback()
		return companies, err
	}

	companyExpiredDate := companies.ExpiredDate.AddDate(0, 0, variant.SubscribePeriodDay)

	createSubs := models.Company{
		ID:          companies.ID,
		UserID:      variantsubs.UserID,
		VariantID:   variant.ID,
		Status:      variant.Name,
		Name: companies.Name,
		ExpiredDate: companyExpiredDate,
	}

	if err := tx.Save(&createSubs).Error; err != nil {
		tx.Rollback()
		return createSubs, err
	}

	// commit subs
	if err := tx.Commit().Error; err != nil {
		tx.Rollback() // rollback
		return createSubs, err
	}

	
	return createSubs, nil
}

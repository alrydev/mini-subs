package repositories

import (
	authdto "server/dto/auth"
	"server/models"
	"time"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user authdto.RegisterRequest, IdPackage int) error
	Login(email string) (models.User, error)
	GetUserAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (ar *repository) Register(user authdto.RegisterRequest, IDPackage int) error {
	// transactional begin: 
	tx := ar.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}


	userRecord := models.User{
		Name:      user.Name,
		Email:     user.Email,
		Password:  user.Password,
		Role:      "user",
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// add new user
	if err := tx.Create(&userRecord).Error; err != nil {
		tx.Rollback()
		return err
	}

	variant := models.Variant{}
	if err := tx.Where("id = ?", IDPackage).First(&variant).Error; err != nil {
		tx.Rollback()
		return err
	}

	companyRecord := models.Company{
		Name:        user.CompanyName,
		UserID:      userRecord.ID,
		StartDate:   time.Now(),
		ExpiredDate: time.Now().AddDate(0, 0, variant.SubscribePeriodDay),
		VariantID:   1,
		Status:      "trial",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	if err := tx.Create(&companyRecord).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (ar *repository) Login(email string) (models.User, error) {
	var user models.User
	err := ar.db.Preload("Company").First(&user, "email=?", email).Error

	return user, err
}

func (r *repository) GetUserAuth(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Company").First(&user, ID).Error

	return user, err
}

package authdto

import "server/models"

type LoginResponse struct {
	Id      int              `json:"user_id"`
	Name    string           `json:"Name"`
	Email   string           `json:"email"`
	Role    string           `json:"role"`
	Token   string           `json:"token"`
	// Company []models.Company `json:"company"`
}

type RegisterResponse struct {
	Name        string `json:"name"`
	CompanyName string `json:"company_name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
}

type CheckAuthResponse struct {
	Id    int    `gorm:"type: int" json:"user_id"`
	Name  string `gorm:"type: varchar(255)" json:"Name"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Role  string `gorm:"type: varchar(50)"  json:"role"`
	Company []models.Company `json:"company"`
}

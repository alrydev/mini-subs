package authdto

type RegisterRequest struct {
	Name string `gorm:"type: varchar(255)" json:"name" form:"name"`
	CompanyName string `gorm:"type: varchar(255)" json:"company_name" form:"company_name"`
	Email    string `gorm:"type: varchar(255)" json:"email" form:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" form:"password" validate:"required"`
}


type LoginRequest struct {
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
}
package models

import (
	"time"
)

type Company struct {
	ID          int       `json:"id" gorm:"primaryKey"`
	UserID      int       `json:"user_id"`
	User        User      `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Name        string    `json:"name" gorm:"type:varchar(255)"`
	StartDate   time.Time `json:"start_date"`
	ExpiredDate time.Time `json:"expired_date"`
	VariantID   int       `json:"variant_id"`
	Variant     Variant   `json:"variant" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Status      string    `json:"status" gorm:"type:varchar(255)"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

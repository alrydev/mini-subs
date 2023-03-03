package models

import (
	"time"
)

type Variant struct {
	ID                 int       `json:"id" gorm:"primaryKey"`
	Name               string    `json:"name" gorm:"type:varchar(255)"`
	SubscribePeriodDay int       `json:"subscribe_period_day"`
	Price              float64   `json:"price" gorm:"type:varchar(255)"`
	Description        string    `json:"description" gorm:"type:varchar(255)"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}

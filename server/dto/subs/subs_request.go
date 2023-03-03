package authdto

type SubscribeRequest struct {
	UserID int `json:"user_id"`
	VariantID int `json:"variant_id"`
	CompanyID int `json:"company_id"`
}

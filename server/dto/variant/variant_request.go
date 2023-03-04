package variantdto

type CreateVariantRequest struct {
	Name               string `json:"name"`
	SubscribePeriodDay int `json:"subs_period"`
	Price              int `json:"price"`
	Desc               string `json:"desc"`
}

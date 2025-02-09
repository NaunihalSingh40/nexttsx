import React, { useState, useEffect, useContext } from "react";
import ReactGA from "react-ga4";
import Slider from "react-slick";
import LazyLoad from "react-lazyload";
import { deleteWithAuthentication, postLoginCall } from "@/api/axios";
import { CalculateDiscount } from "@/utils/helper";
import { isLoggedIn } from "@/utils/validateToken";
import { getUserId, getOrCreateDeviceId, formatIndianRupees } from "@/helper";
import { AddCookie, getValueFromCookie } from "@/utils/cookies";
import { getSelectCall } from "@/api/axios";
import { search_types } from "@/constants/searchTypes";
import { SearchContext } from "@/context/searchContext";
import { CartContext } from "@/context/cartContext";
import { ToastContext } from "@/context/toastContext";
import {
  toast_actions,
  toast_types,
} from "@/components/shared/toast/utils/toast";
import CustomButton from "@/components/Button";
import CustomizationRenderer from "components/application/product-list/product-details/CustomizationRenderer";
import ModalComponent from "components/common/Modal";
import NoDataFound from "views/EmptyData";
import LoginModal from "views/LoginModal";
import PlaceOrderModal from "views/OrderModal";
import HpWishlistIcon from "@/assets/svg/HPSvgs/HpWishlistIcon";
import HPWishlistFilledIcon from "@/assets/svg/HPSvgs/HPWishlistFilledIcon";
import HpNextIcon from "@/assets/svg/HpNextIcon";
import HpPreviousIcon from "@/assets/svg/HpPreviousIcon";
import {
  Container,
  MainHeading,
  ProductSection,
  ProductWrapper,
  DetailWrapper,
  ProductImageWrapper,
  WishlistWrapper,
  ProductName,
  PriceWrapper,
  OriginalPrice,
  ProductPrice,
  DiscountPercentage,
  ButtonWrapper,
  NoDataWrapper,
  IconButton,
} from "@/styles/hpLayout/heroProducts";

// Define interfaces for data structures
interface Product {
  id: string;
  local_id: string;
  item_details: {
    id: string;
    descriptor: {
      name: string;
      symbol: string;
    };
    price: {
      maximum_value: string;
      value: string;
    };
    quantity: {
      available: {
        count: string;
      };
    };
  };
  provider_details: {
    id: string;
  };
  wishlistAdded?: boolean;
  customisation_items?: any[];
}

interface HeroProductsData {
  response: {
    data: Product[];
  };
}

interface Search {
  type: string;
  value: string;
}

interface Location {
  name: string;
  lat: string;
  lng: string;
}

interface CustomizationState {
  [key: string]: any;
}

const OurHeroProducts: React.FC = () => {
  const BASE_URL = process.env.REACT_APP_CDN_URL || "";
  const ProductImage = "assets/images/no_image_found.png";
  const ButtonIcon = "assets/images/HpImages/Button.png";

  const history = useHistory();
  const { setSearchData, setLocationData } = useContext(SearchContext);
  const { fetchCartItems, cartItems } = useContext(CartContext);
  const dispatch = useContext(ToastContext);
  const [customization_state, setCustomizationState] =
    useState<CustomizationState>({});
  const [orderModal, setOrderModal] = useState(false);
  const [buyNow, setBuyNow] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [buttonDisable, setButtonDisable] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");
  const [heroProductsData, setHeroProductsData] = useState<Product[]>([]);
  const [search, setSearch] = useState<Search>({
    type: search_types.PRODUCT,
    value: "",
  });
  const [searchedLocation, setSearchedLocation] = useState<Location>({
    name: "",
    lat: "",
    lng: "",
  });

  const execute = async () => {
    const deviceId = await getOrCreateDeviceId();
    setDeviceId(deviceId);
  };

  useEffect(() => {
    execute();
  }, []);

  const getOurHeroProducts = async () => {
    const userId = getUserId();
    setLoading((prev) => ({ ...prev, loading: true }));
    const params = {
      tag: "ourheroproduct",
    };
    try {
      const data: HeroProductsData = await getSelectCall(
        `/clientApis/v2/search/${userId}?deviceId=${deviceId}`,
        params
      );
      setHeroProductsData(data?.response?.data || []);
      setLoading((prev) => ({ ...prev, loading: false }));
    } catch (err) {
      setLoading((prev) => ({ ...prev, loading: false }));
      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.error,
          message:
            "Sorry, we hit a snag while fetching the products. Please try again.",
        },
      });
    }
  };

  useEffect(() => {
    if (deviceId) {
      getOurHeroProducts();
    }
  }, [deviceId]);

  const useQuery = () => {
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();
  const getLastEnteredValues = () => {
    const searchProductName = query.get("s");
    let search_context = getValueFromCookie("search_context");
    if (search_context) {
      search_context = JSON.parse(search_context);
      setSearch(() => ({
        type: search_context.search.type,
        value: query.size > 0 && searchProductName ? searchProductName : "",
      }));
      setSearchedLocation(search_context.location);
      setSearchData(() => ({
        type: search_context.search.type,
        value: query.size > 0 && searchProductName ? searchProductName : "",
      }));
      setLocationData(() => search_context.location);
    }
  };

  useEffect(() => {
    getLastEnteredValues();
  }, []);

  let selectedCustomizationIds: string[] = [];

  const getCustomization_ = (groupId: string) => {
    let group = customization_state[groupId];
    if (!group) return;

    group.selected.map((s: any) => selectedCustomizationIds.push(s.id));
    group?.childs?.map((child: any) => {
      getCustomization_(child);
    });
  };

  const getCustomizations = (product: Product) => {
    if (!product?.customisation_items?.length) return null;
    const customizations: any[] = [];

    const firstGroupId = customization_state["firstGroup"]?.id;

    if (!firstGroupId) return;
    getCustomization_(firstGroupId);

    for (const cId of selectedCustomizationIds) {
      let c = product?.customisation_items.find(
        (item) => item.local_id === cId
      );
      if (c) {
        c = {
          ...c,
          quantity: {
            count: 1,
          },
        };
        customizations.push(c);
      }
    }

    return customizations;
  };

  // Add to cart
  const handleAddToCart = async (product: Product) => {
    const userId = getUserId();

    if (buttonDisable[product.id]) return;
    ReactGA.event({
      category: "Top Selling",
      action: "Click",
      label: "Add to Cart",
    });
    setLoading((prevState) => ({ ...prevState, [product.id]: true }));

    let searchDataUpdate = { ...search };
    const search_context = {
      search: searchDataUpdate,
      location: searchedLocation,
    };
    AddCookie("search_context", JSON.stringify(search_context));
    const deviceId = await getOrCreateDeviceId();

    const url = `/clientApis/v2/cart/${userId}/${deviceId}`;

    const payload = {
      customisations: getCustomizations(product),
      hasCustomisations: !!getCustomizations(product),
      customisationState: customization_state,
      local_id: product?.local_id,
      id: product?.id,
      provider: {
        id: product?.provider_details?.id,
      },
      quantity: {
        count: 1,
      },
    };

    try {
      const data = await postLoginCall(url, payload);
      if (data) {
        fetchCartItems();
        localStorage.setItem("cartItems", JSON.stringify(data));
        dispatch({
          type: toast_actions.ADD_TOAST,
          payload: {
            id: Math.floor(Math.random() * 100),
            type: toast_types.success,
            message: "Item added to cart successfully.",
          },
        });
      }

      setLoading((prevState) => ({ ...prevState, [product.id]: false }));
    } catch (error) {
      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.error,
          message:
            "Unfortunately, We’re experiencing some technical issues while adding items to your cart. Please bear with us & get back to us sometime.",
        },
      });
    }
  };

  // Buy Now
  const handleBuyNow = (product: Product) => {
    ReactGA.event({
      category: "Top Selling",
      action: "Click",
      label: "Buy Now",
    });
    let searchDataUpdate = { ...search };

    const search_context = {
      search: searchDataUpdate,
      location: searchedLocation,
    };
    AddCookie("search_context", JSON.stringify(search_context));
    setSelectedProduct(product);
    if (!isLoggedIn()) {
      setBuyNow(true);
      setLoginModal(true);
      return;
    } else {
      setOrderModal(true);
    }
  };

  const handleWishlist = async (product: Product) => {
    const userId = getUserId();
    const { item_details } = product;
    if (!isLoggedIn()) {
      setLoginModal(true);
      return;
    }

    const deviceId = await getOrCreateDeviceId();
    const url = `/clientApis/v2/wishlist/${userId}/${deviceId}`;
    const payload = {
      local_id: product?.local_id,
      id: product?.id,
      provider: {
        id: product?.provider_details?.id,
      },
      quantity: {
        count: 1,
      },
    };

    setHeroProductsData((prevItems) =>
      prevItems.map((item) =>
        item?.item_details.id === item_details?.id
          ? { ...item, wishlistAdded: true }
          : item
      )
    );

    try {
      const res = await postLoginCall(url, payload);
      if (res.status !== "error") {
        localStorage.setItem("wishlistItems", JSON.stringify(res));
        dispatch({
          type: toast_actions.ADD_TOAST,
          payload: {
            id: Math.floor(Math.random() * 100),
            type: toast_types.success,
            message: "Item added to wishlist successfully.",
          },
        });
      } else {
        dispatch({
          type: toast_actions.ADD_TOAST,
          payload: {
            id: Math.floor(Math.random() * 100),
            type: toast_types.error,
            message:
              "It looks like the item already exists in the Wishlist. Please check",
          },
        });
      }
    } catch (error) {
      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.error,
          message:
            "Sorry, you cannot add this item to your Wishlist due to technical glitch. Please try again.",
        },
      });
    }
  };

  // Remove from wishlist
  const handleRemoveFromTopSellingWishlist = async (
    item_details: any,
    e: React.MouseEvent
  ) => {
    const userId = getUserId();
    e.stopPropagation();

    if (!isLoggedIn()) {
      setLoginModal(true);
      return;
    }

    try {
      const deviceId = await getOrCreateDeviceId();
      const url = `/clientApis/v2/item/wishlist/${userId}/${deviceId}/${item_details?.id}`;
      await deleteWithAuthentication(url);

      setHeroProductsData((prevItems) =>
        prevItems.map((item) =>
          item?.item_details.id === item_details?.id
            ? { ...item, wishlistAdded: false }
            : item
        )
      );

      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.success,
          message: "Item removed from your Wishlist",
        },
      });
    } catch (error) {
      dispatch({
        type: toast_actions.ADD_TOAST,
        payload: {
          id: Math.floor(Math.random() * 100),
          type: toast_types.error,
          message:
            "Sorry, we hit a snag while fetching the Wishlist products. Please try again.",
        },
      });
    }
  };

  const settings = {
    dots: false,
    infinite: heroProductsData?.length > 4,
    speed: 500,
    slidesToShow: heroProductsData?.length >= 4 ? 5 : heroProductsData?.length,
    slidesToScroll: 1,
    arrows: heroProductsData?.length > 4,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow:
            heroProductsData?.length >= 4 ? 4 : heroProductsData?.length,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:
            heroProductsData?.length >= 3 ? 3 : heroProductsData?.length,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            heroProductsData?.length >= 2 ? 2 : heroProductsData?.length,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: heroProductsData?.length > 1,
        },
      },
    ],
    nextArrow: (
      <IconButton>
        <HpNextIcon />
      </IconButton>
    ),
    prevArrow: (
      <IconButton>
        <HpPreviousIcon />
      </IconButton>
    ),
  };

  useEffect(() => {
    if (heroProductsData && heroProductsData.length > 0) {
      const buttonStates = heroProductsData.reduce((acc, product) => {
        const inCart = cartItems.some((item) => item.item.id === product.id);
        acc[product.id] = inCart;
        return acc;
      }, {} as { [key: string]: boolean });

      setButtonDisable(buttonStates);
    }
  }, [cartItems, heroProductsData]);

  return (
    <Container>
      <MainHeading>Top Picks</MainHeading>
      <ProductSection>
        {heroProductsData && heroProductsData?.length > 0 ? (
          <Slider {...settings}>
            {heroProductsData?.map((item, index) => {
              const { item_details } = item;
              const maxProductValue = parseFloat(
                item?.item_details?.price?.maximum_value
              ).toFixed(2);
              const productValue = parseFloat(
                item?.item_details?.price?.value
              ).toFixed(2);
              const discount = CalculateDiscount(
                item?.item_details?.price?.maximum_value,
                item?.item_details?.price?.value
              );
              return (
                <LazyLoad key={index} height={200} offset={100} once>
                  <ProductWrapper key={index}>
                    <DetailWrapper>
                      <ProductImageWrapper>
                        <WishlistWrapper>
                          {item.wishlistAdded ? (
                            <HPWishlistFilledIcon
                              onClick={async (e) => {
                                handleRemoveFromTopSellingWishlist(
                                  item_details,
                                  e
                                );
                              }}
                            />
                          ) : (
                            <HpWishlistIcon
                              onClick={() => {
                                handleWishlist(item);
                              }}
                            />
                          )}
                        </WishlistWrapper>
                        <img
                          src={
                            item_details?.descriptor?.symbol
                              ? item_details?.descriptor?.symbol
                              : BASE_URL + ProductImage
                          }
                          onError={(e) => {
                            e.target.src =
                              "https://www.huber-online.com/daisy_website_files/_processed_/8/0/csm_no-image_d5c4ab1322.jpg";
                          }}
                          onClick={() => {
                            history.push(`products?productId=${item?.id}`);
                          }}
                          alt="Product"
                        />
                      </ProductImageWrapper>
                      <ProductName>
                        {item_details?.descriptor?.name}
                      </ProductName>
                      <PriceWrapper>
                        <OriginalPrice>
                          ₹{formatIndianRupees(maxProductValue)}
                        </OriginalPrice>
                        <ProductPrice>
                          ₹
                          {formatIndianRupees(
                            parseFloat(productValue).toFixed(2)
                          )}
                        </ProductPrice>
                        {discount > 0 && (
                          <DiscountPercentage>
                            {Math.round(discount)}% OFF
                          </DiscountPercentage>
                        )}
                      </PriceWrapper>
                      <ButtonWrapper>
                        {item_details?.quantity?.available?.count === "0" ? (
                          <CustomButton
                            label="Out of stock"
                            variant="contained1"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleBuyNow(item);
                            }}
                            disabled
                            className="outOfStock"
                          />
                        ) : (
                          <>
                            <CustomButton
                              variant="text"
                              className="cart-button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart(item);
                                setButtonDisable((prev) => ({
                                  ...prev,
                                  [item?.id]: true,
                                }));
                              }}
                              disabled={
                                item_details?.quantity?.available?.count ===
                                  "0" ||
                                buttonDisable[item?.id] ||
                                loading[item?.id]
                              }
                              icon={
                                <img
                                  src={BASE_URL + ButtonIcon}
                                  height={36}
                                  width={36}
                                  alt="Button Icon"
                                />
                              }
                            />
                            <CustomButton
                              label="Buy Now"
                              variant="contained1"
                              onClick={(e: any) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleBuyNow(item);
                              }}
                              disabled={
                                item_details?.quantity?.available?.count ===
                                  "0" || loading[item?.id]
                              }
                            />
                          </>
                        )}
                      </ButtonWrapper>
                    </DetailWrapper>
                  </ProductWrapper>
                </LazyLoad>
              );
            })}
          </Slider>
        ) : (
          <NoDataWrapper className="empty-state">
            <NoDataFound />
          </NoDataWrapper>
        )}
        <CustomizationRenderer
          customization_state={customization_state}
          setCustomizationState={setCustomizationState}
        />
      </ProductSection>

      {loginModal && (
        <ModalComponent open={loginModal} onClose={() => setLoginModal(false)}>
          <LoginModal
            onClose={() => setLoginModal(false)}
            buyNow={buyNow}
            setOrderModal={setOrderModal}
          />
        </ModalComponent>
      )}
      {orderModal && (
        <ModalComponent
          open={orderModal}
          onClose={() => setOrderModal(false)}
          title="Get Ready To Shop !"
          titleBg={true}
        >
          <PlaceOrderModal
            onClose={() => setOrderModal(false)}
            product={selectedProduct}
          />
        </ModalComponent>
      )}
    </Container>
  );
};

export default OurHeroProducts;

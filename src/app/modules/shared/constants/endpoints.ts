export class Endpoints {
  // account
  public static account_login = '​​/account/login/';
  public static account_register = '/account/register';
  public static forgot_password = '/account/ForgotPassword';
  public static reset_password = '/account/ResetPassword';

  //
  public static cities_get = '/booking/cities';
  public static available_hotels_get = '/Hotels/GetAvailableHotels';
  public static hotels_availabilities_get = '/Hotels/GetHotels';
  public static hotels_details_get = '/Hotels/GetHotels/';
  public static hotels_details_get_by_slug = '/hotels/getHotelBySlug/';
  public static hotels_available_rooms_get = '/hotels/groupedAvailabaleRooms/';
  public static banks_accounts_get = '/booking/bankAccounts';
  public static bookings_multi_rooms_post = '/booking/book_multi_rooms';
  public static hotels_get = '/Hotels/GetHotels';
  public static promotions_get = '/Promotion/GetPromotions';
  public static hotels_roominfo_get = '/hotels/GetRoomsInfo/';

  // hotels
  public static hotels_search_list = '​​/hotels/search/';
  public static hotels_searchwithdetails_list = '​​/hotels/searchwithdetails/';
  public static hotels_details = '​​/hotels/details/';
  public static hotels_checkavailability = '​​/Hotels/check_availability';
  public static hotels_reservation = '​​/Hotels/reservation';
  public static hotels_viewreservation = '​​/Hotels/viewreservation';
  public static hotels_cancelreservation = '​​/Hotels/cancelreservation';
  public static hotels_confirm_cancelreservation = '​​/Hotels/confirmcancel';

  // settings
  public static countries_list = '​​/settings/countries/';

  // reservations
  public static reservations_list = '/package/list_packages';

  // users
  public static users_get = '/account/GetProfile';
  public static users_agency_get = '/account/GetUserAgency';
  public static users_agency_update = '/account/UpdateUserAgency';
  public static users_update = '/account/UpdateProfile';
  public static users_register = '/account/Register';
}

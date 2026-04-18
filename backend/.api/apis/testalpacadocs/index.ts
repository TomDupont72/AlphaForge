import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'testalpacadocs/2.0.1 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Returns your account details.
   *
   * @summary Get Account
   */
  getAccount(): Promise<FetchResponse<200, types.GetAccountResponse200>> {
    return this.core.fetch('/v2/account', 'get');
  }

  /**
   * Places a new order for the given account. An order request may be rejected if the
   * account is not authorized for trading, or if the tradable balance is insufficient to
   * fill the order.
   *
   * @summary Create an Order
   */
  postOrder(body: types.PostOrderBodyParam): Promise<FetchResponse<200, types.PostOrderResponse200>> {
    return this.core.fetch('/v2/orders', 'post', body);
  }

  /**
   * Retrieves a list of orders for the account, filtered by the supplied query parameters.
   *
   * @summary Get All Orders
   */
  getAllOrders(metadata?: types.GetAllOrdersMetadataParam): Promise<FetchResponse<200, types.GetAllOrdersResponse200>> {
    return this.core.fetch('/v2/orders', 'get', metadata);
  }

  /**
   * Attempts to cancel all open orders. A response will be provided for each order that is
   * attempted to be cancelled. If an order is no longer cancelable, the server will respond
   * with status 500 and reject the request.
   *
   * @summary Delete All Orders
   */
  deleteAllOrders(): Promise<FetchResponse<207, types.DeleteAllOrdersResponse207>> {
    return this.core.fetch('/v2/orders', 'delete');
  }

  /**
   * Retrieves a single order specified by the client order ID.
   *
   * @summary Get Order by Client Order ID
   */
  getOrderByClientOrderId(metadata: types.GetOrderByClientOrderIdMetadataParam): Promise<FetchResponse<200, types.GetOrderByClientOrderIdResponse200>> {
    return this.core.fetch('/v2/orders:by_client_order_id', 'get', metadata);
  }

  /**
   * Retrieves a single order for the given order_id.
   *
   * @summary Get Order by ID
   */
  getOrderByOrderID(metadata: types.GetOrderByOrderIdMetadataParam): Promise<FetchResponse<200, types.GetOrderByOrderIdResponse200>> {
    return this.core.fetch('/v2/orders/{order_id}', 'get', metadata);
  }

  /**
   * Replaces a single order with updated parameters. Each parameter overrides the
   * corresponding attribute of the existing order. The other attributes remain the same as
   * the existing order.
   *
   * A success return code from a replaced order does NOT guarantee the existing open order
   * has been replaced. If the existing open order is filled before the replacing (new) order
   * reaches the execution venue, the replacing (new) order is rejected, and these events are
   * sent in the trade_updates stream channel.
   *
   * While an order is being replaced, buying power is reduced by the larger of the two
   * orders that have been placed (the old order being replaced, and the newly placed order
   * to replace it). If you are replacing a buy entry order with a higher limit price than
   * the original order, the buying power is calculated based on the newly placed order. If
   * you are replacing it with a lower limit price, the buying power is calculated based on
   * the old order.
   *
   * Note: Order cannot be replaced when the status is `accepted`, `pending_new`,
   * `pending_cancel` or `pending_replace`.
   *
   * Note: Notional orders cannot be replaced. Any attempt to modify a notional order via
   * this endpoint will be rejected. To change a notional order, cancel it and submit a new
   * one.
   *
   * @summary Replace Order by ID
   */
  patchOrderByOrderId(body: types.PatchOrderByOrderIdBodyParam, metadata: types.PatchOrderByOrderIdMetadataParam): Promise<FetchResponse<200, types.PatchOrderByOrderIdResponse200>> {
    return this.core.fetch('/v2/orders/{order_id}', 'patch', body, metadata);
  }

  /**
   * Attempts to cancel an Open Order. If the order is no longer cancelable, the request will
   * be rejected with status 422; otherwise accepted with return status 204.
   *
   * @summary Delete Order by ID
   */
  deleteOrderByOrderID(metadata: types.DeleteOrderByOrderIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v2/orders/{order_id}', 'delete', metadata);
  }

  /**
   * The positions API provides information about an account’s current open positions. The
   * response will include information such as cost basis, shares traded, and market value,
   * which will be updated live as price information is updated. Once a position is closed,
   * it will no longer be queryable through this API
   *
   * Retrieves a list of the account’s open positions
   *
   * @summary All Open Positions
   */
  getAllOpenPositions(): Promise<FetchResponse<200, types.GetAllOpenPositionsResponse200>> {
    return this.core.fetch('/v2/positions', 'get');
  }

  /**
   * Closes (liquidates) all of the account’s open long and short positions. A response will
   * be provided for each order that is attempted to be cancelled. If an order is no longer
   * cancelable, the server will respond with status 500 and reject the request.
   *
   * @summary Close All Positions
   */
  deleteAllOpenPositions(metadata?: types.DeleteAllOpenPositionsMetadataParam): Promise<FetchResponse<207, types.DeleteAllOpenPositionsResponse207>> {
    return this.core.fetch('/v2/positions', 'delete', metadata);
  }

  /**
   * Retrieves the account’s open position for the given symbol or assetId.
   *
   * @summary Get an Open Position
   */
  getOpenPosition(metadata: types.GetOpenPositionMetadataParam): Promise<FetchResponse<200, types.GetOpenPositionResponse200>> {
    return this.core.fetch('/v2/positions/{symbol_or_asset_id}', 'get', metadata);
  }

  /**
   * Closes (liquidates) the account’s open position for the given symbol. Works for both
   * long and short positions.
   *
   * @summary Close a Position
   */
  deleteOpenPosition(metadata: types.DeleteOpenPositionMetadataParam): Promise<FetchResponse<200, types.DeleteOpenPositionResponse200>> {
    return this.core.fetch('/v2/positions/{symbol_or_asset_id}', 'delete', metadata);
  }

  /**
   * This endpoint enables users to exercise a held option contract, converting it into the
   * underlying asset based on the specified terms.
   * All available held shares of this option contract will be exercised.
   * By default, Alpaca will automatically exercise in-the-money (ITM) contracts at expiry.
   * Exercise requests will be processed immediately once received. Exercise requests
   * submitted between market close and midnight will be rejected to avoid any confusion
   * about when the exercise will settle.
   * To cancel an exercise request or to submit a Do-not-exercise (DNE) instruction, you can
   * use the do-not-exercise endpoint or contact our support team.
   *
   * @summary Exercise an Options Position
   * @throws FetchError<403, types.OptionExerciseResponse403> Forbidden
   *
   * Available position quantity is not sufficient.
   * @throws FetchError<422, types.OptionExerciseResponse422> Invalid Parameters.
   *
   * One or more parameters provided are invalid.
   */
  optionExercise(metadata: types.OptionExerciseMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v2/positions/{symbol_or_contract_id}/exercise', 'post', metadata);
  }

  /**
   * This endpoint enables users to submit a do-not-exercise (DNE) instruction for a held
   * option contract, preventing automatic exercise at expiry.
   * By default, Alpaca will automatically exercise in-the-money (ITM) contracts at expiry.
   * This endpoint allows users to override that behavior.
   * To override this behavior and submit an exercise instruction, please contact our support
   * team.
   *
   * @summary Do Not Exercise an Options Position
   * @throws FetchError<403, types.OptionDoNotExerciseResponse403> Forbidden
   *
   * Available position quantity is not sufficient or no position found.
   * @throws FetchError<422, types.OptionDoNotExerciseResponse422> Invalid Parameters.
   *
   * One or more parameters provided are invalid.
   */
  optionDoNotExercise(metadata: types.OptionDoNotExerciseMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v2/positions/{symbol_or_contract_id}/do-not-exercise', 'post', metadata);
  }

  /**
   * Returns timeseries data about equity and profit/loss (P/L) of the account in requested
   * timespan.
   *
   * @summary Get Account Portfolio History
   */
  getAccountPortfolioHistory(metadata?: types.GetAccountPortfolioHistoryMetadataParam): Promise<FetchResponse<200, types.GetAccountPortfolioHistoryResponse200>> {
    return this.core.fetch('/v2/account/portfolio/history', 'get', metadata);
  }

  /**
   * Returns the list of watchlists registered under the account.
   *
   * @summary Get All Watchlists
   */
  getWatchlists(): Promise<FetchResponse<200, types.GetWatchlistsResponse200>> {
    return this.core.fetch('/v2/watchlists', 'get');
  }

  /**
   * Create a new watchlist with initial set of assets.
   *
   * @summary Create Watchlist
   */
  postWatchlist(body: types.PostWatchlistBodyParam): Promise<FetchResponse<200, types.PostWatchlistResponse200>> {
    return this.core.fetch('/v2/watchlists', 'post', body);
  }

  /**
   * Returns a watchlist identified by the ID.
   *
   * @summary Get Watchlist by ID
   */
  getWatchlistById(metadata: types.GetWatchlistByIdMetadataParam): Promise<FetchResponse<200, types.GetWatchlistByIdResponse200>> {
    return this.core.fetch('/v2/watchlists/{watchlist_id}', 'get', metadata);
  }

  /**
   * Update the name and/or content of watchlist
   *
   * @summary Update Watchlist By Id
   */
  updateWatchlistById(body: types.UpdateWatchlistByIdBodyParam, metadata: types.UpdateWatchlistByIdMetadataParam): Promise<FetchResponse<200, types.UpdateWatchlistByIdResponse200>> {
    return this.core.fetch('/v2/watchlists/{watchlist_id}', 'put', body, metadata);
  }

  /**
   * Append an asset for the symbol to the end of watchlist asset list
   *
   * @summary Add Asset to Watchlist
   */
  addAssetToWatchlist(body: types.AddAssetToWatchlistBodyParam, metadata: types.AddAssetToWatchlistMetadataParam): Promise<FetchResponse<200, types.AddAssetToWatchlistResponse200>>;
  addAssetToWatchlist(metadata: types.AddAssetToWatchlistMetadataParam): Promise<FetchResponse<200, types.AddAssetToWatchlistResponse200>>;
  addAssetToWatchlist(body?: types.AddAssetToWatchlistBodyParam | types.AddAssetToWatchlistMetadataParam, metadata?: types.AddAssetToWatchlistMetadataParam): Promise<FetchResponse<200, types.AddAssetToWatchlistResponse200>> {
    return this.core.fetch('/v2/watchlists/{watchlist_id}', 'post', body, metadata);
  }

  /**
   * Delete a watchlist. This is a permanent deletion.
   *
   * @summary Delete Watchlist By Id
   */
  deleteWatchlistById(metadata: types.DeleteWatchlistByIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v2/watchlists/{watchlist_id}', 'delete', metadata);
  }

  /**
   * You can also call GET, PUT, POST and DELETE with watchlist name with another endpoint
   * /v2/watchlists:by_name and query parameter name=<watchlist_name>, instead of
   * /v2/watchlists/{watchlist_id} endpoints
   *
   * Returns a watchlist by name
   *
   * @summary Get Watchlist by Name
   */
  getWatchlistByName(metadata: types.GetWatchlistByNameMetadataParam): Promise<FetchResponse<200, types.GetWatchlistByNameResponse200>> {
    return this.core.fetch('/v2/watchlists:by_name', 'get', metadata);
  }

  /**
   * Update the name and/or content of watchlist
   *
   * @summary Update Watchlist By Name
   */
  updateWatchlistByName(body: types.UpdateWatchlistByNameBodyParam, metadata: types.UpdateWatchlistByNameMetadataParam): Promise<FetchResponse<200, types.UpdateWatchlistByNameResponse200>> {
    return this.core.fetch('/v2/watchlists:by_name', 'put', body, metadata);
  }

  /**
   * Append an asset for the symbol to the end of watchlist asset list
   *
   * @summary Add Asset to Watchlist By Name
   */
  addAssetToWatchlistByName(body: types.AddAssetToWatchlistByNameBodyParam, metadata: types.AddAssetToWatchlistByNameMetadataParam): Promise<FetchResponse<200, types.AddAssetToWatchlistByNameResponse200>>;
  addAssetToWatchlistByName(metadata: types.AddAssetToWatchlistByNameMetadataParam): Promise<FetchResponse<200, types.AddAssetToWatchlistByNameResponse200>>;
  addAssetToWatchlistByName(body?: types.AddAssetToWatchlistByNameBodyParam | types.AddAssetToWatchlistByNameMetadataParam, metadata?: types.AddAssetToWatchlistByNameMetadataParam): Promise<FetchResponse<200, types.AddAssetToWatchlistByNameResponse200>> {
    return this.core.fetch('/v2/watchlists:by_name', 'post', body, metadata);
  }

  /**
   * Delete a watchlist. This is a permanent deletion.
   *
   * @summary Delete Watchlist By Name
   */
  deleteWatchlistByName(metadata: types.DeleteWatchlistByNameMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v2/watchlists:by_name', 'delete', metadata);
  }

  /**
   * Delete one entry for an asset by symbol name
   *
   * @summary Delete Symbol from Watchlist
   */
  removeAssetFromWatchlist(metadata: types.RemoveAssetFromWatchlistMetadataParam): Promise<FetchResponse<200, types.RemoveAssetFromWatchlistResponse200>> {
    return this.core.fetch('/v2/watchlists/{watchlist_id}/{symbol}', 'delete', metadata);
  }

  /**
   * gets the current account configuration values
   *
   * @summary Get Account Configurations
   */
  getAccountConfig(): Promise<FetchResponse<200, types.GetAccountConfigResponse200>> {
    return this.core.fetch('/v2/account/configurations', 'get');
  }

  /**
   * Updates and returns the current account configuration values
   *
   * @summary Account Configurations
   */
  patchAccountConfig(body?: types.PatchAccountConfigBodyParam): Promise<FetchResponse<200, types.PatchAccountConfigResponse200>> {
    return this.core.fetch('/v2/account/configurations', 'patch', body);
  }

  /**
   * Returns a list of activities
   *
   * Notes:
   * * Pagination is handled using the `page_token` and `page_size` parameters.
   * * `page_token` represents the ID of the last item on your current page of results.
   *    For example, if the ID of the last activity in your first response is
   * `20220203000000000::045b3b8d-c566-4bef-b741-2bf598dd6ae7`, you would pass that value as
   * `page_token` to retrieve the next page of results.
   *
   * @summary Retrieve Account Activities
   */
  getAccountActivities(metadata?: types.GetAccountActivitiesMetadataParam): Promise<FetchResponse<200, types.GetAccountActivitiesResponse200>> {
    return this.core.fetch('/v2/account/activities', 'get', metadata);
  }

  /**
   * Returns account activity entries for a specific type of activity.
   *
   * @summary Retrieve Account Activities of Specific Type
   */
  getAccountActivitiesByActivityType(metadata: types.GetAccountActivitiesByActivityTypeMetadataParam): Promise<FetchResponse<200, types.GetAccountActivitiesByActivityTypeResponse200>> {
    return this.core.fetch('/v2/account/activities/{activity_type}', 'get', metadata);
  }

  /**
   * The Events API sends the real-time events and provides historical queries with SSE
   * (Server Sent Events).
   *
   * This endpoint streams events on account activities.
   *
   * Historical events are streamed immediately if queried, and updates are pushed as events
   * occur.
   *
   * Query parameter rules:
   * - If `until` is specified, `since` is required.
   * - If `until_id` is specified, `since_id` is required.
   * - You cannot use `since` and `since_id` together.
   * Behavior:
   * - If `since` or `since_id` is not specified, this will not return any historic data.
   * - If `until` or `until_id` is specified, stream will end at the specified point with
   * status 200.
   *
   * ---
   *
   * Warning: Currently, OAS-3 does not fully support responses from an SSE API.
   *
   * In case the client code is generated from this OAS spec, please do not specify `since`
   * and `until`, as the generated client may hang forever waiting for the response to end.
   *
   * If you require the streaming capabilities, we recommend not using the generated clients
   * for this specific endpoint until the OAS-3 standards define how to represent this
   * behavior.
   *
   * ---
   *
   * ###  Comment messages
   * According to the SSE specification, any line that starts with a colon is a comment which
   * does not contain data.  It is typically a free text that does not follow any data
   * schema. A few examples mentioned below for comment messages.
   *
   * #####  Slow client
   *
   * The server sends a comment when the client is not consuming messages fast enough.
   * Example: `: you are reading too slowly, dropped 10000 messages`
   *
   * ##### Internal server error
   *
   * An error message is sent as a comment when the server closes the connection on an
   * internal server error (only sent by the v2 and v2beta1 endpoints). Example: `: internal
   * server error`
   *
   * ---
   *
   * @summary Subscribe to Activity Events (SSE)
   */
  subscribeToActivitiesSSE(metadata?: types.SubscribeToActivitiesSseMetadataParam): Promise<FetchResponse<200, types.SubscribeToActivitiesSseResponse200>> {
    return this.core.fetch('/v2alpha1/events/activities', 'get', metadata);
  }

  /**
   * The calendar API serves the full list of market days from 1970 to 2029. It can also be
   * queried by specifying a start and/or end time to narrow down the results. In addition to
   * the dates, the response also contains the specific open and close times for the market
   * days, taking into account early closures.
   *
   * @summary Get US Market Calendar
   * @throws FetchError<400, types.LegacyCalendarResponse400> One of the request parameters is invalid. See the returned message for details.
   *
   * @throws FetchError<429, types.LegacyCalendarResponse429> Too many requests. You hit the rate limit. Use the X-RateLimit-... response headers to
   * make sure you're under the rate limit.
   *
   */
  legacyCalendar(metadata?: types.LegacyCalendarMetadataParam): Promise<FetchResponse<200, types.LegacyCalendarResponse200>> {
    return this.core.fetch('/v2/calendar', 'get', metadata);
  }

  /**
   * The clock API serves the current market timestamp, whether or not the market is
   * currently open, as well as the times of the next market open and close.
   *
   * @summary Get US Market Clock
   * @throws FetchError<429, types.LegacyClockResponse429> Too many requests. You hit the rate limit. Use the X-RateLimit-... response headers to
   * make sure you're under the rate limit.
   *
   */
  legacyClock(): Promise<FetchResponse<200, types.LegacyClockResponse200>> {
    return this.core.fetch('/v2/clock', 'get');
  }

  /**
   * This endpoint returns the market calendar.
   *
   * @summary Get Market Calendar
   * @throws FetchError<400, types.CalendarResponse400> One of the request parameters is invalid. See the returned message for details.
   *
   * @throws FetchError<429, types.CalendarResponse429> Too many requests. You hit the rate limit. Use the X-RateLimit-... response headers to
   * make sure you're under the rate limit.
   *
   */
  calendar(metadata: types.CalendarMetadataParam): Promise<FetchResponse<200, types.CalendarResponse200>> {
    return this.core.fetch('/v3/calendar/{market}', 'get', metadata);
  }

  /**
   * This API serves information about multiple markets: the current time, if it's a market
   * day, the current phase of the market, etc.
   *
   * @summary Get Market Clock
   * @throws FetchError<400, types.ClockResponse400> One of the request parameters is invalid. See the returned message for details.
   *
   * @throws FetchError<429, types.ClockResponse429> Too many requests. You hit the rate limit. Use the X-RateLimit-... response headers to
   * make sure you're under the rate limit.
   *
   */
  clock(metadata?: types.ClockMetadataParam): Promise<FetchResponse<200, types.ClockResponse200>> {
    return this.core.fetch('/v3/clock', 'get', metadata);
  }

  /**
   * The assets API serves as the master list of assets available for trade and data
   * consumption from Alpaca. Assets are sorted by asset class, exchange and symbol.
   *
   * @summary Get Assets
   */
  getV2Assets(metadata?: types.GetV2AssetsMetadataParam): Promise<FetchResponse<200, types.GetV2AssetsResponse200>> {
    return this.core.fetch('/v2/assets', 'get', metadata);
  }

  /**
   * Get the asset model for a given symbol or asset_id. The symbol or asset_id should be
   * passed in as a path parameter.
   *
   * **Note**: For crypto, the symbol has to follow old symbology, e.g. BTCUSD.
   *
   * **Note**: For coin pairs, the symbol should be separated by a slash (/), e.g. BTC/USDT.
   * Since the slash is a special character in HTTP, use the URL encoded version instead,
   * e.g. /v2/assets/BTC%2FUSDT
   *
   * @summary Get an Asset by ID or Symbol
   */
  getV2AssetsSymbol_or_asset_id(metadata: types.GetV2AssetsSymbolOrAssetIdMetadataParam): Promise<FetchResponse<200, types.GetV2AssetsSymbolOrAssetIdResponse200>> {
    return this.core.fetch('/v2/assets/{symbol_or_asset_id}', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve a list of option contracts based on various
   * filtering criteria.
   * By default only active contracts that expire before the upcoming weekend are returned.
   *
   * @summary Get Option Contracts
   */
  getOptionsContracts(metadata?: types.GetOptionsContractsMetadataParam): Promise<FetchResponse<200, types.GetOptionsContractsResponse200>> {
    return this.core.fetch('/v2/options/contracts', 'get', metadata);
  }

  /**
   * Get an option contract by symbol or contract ID. The symbol or id should be passed in as
   * a path parameter.
   *
   * @summary Get an option contract by ID or Symbol
   * @throws FetchError<404, types.GetOptionContractSymbolOrIdResponse404> Not Found
   */
  getOptionContractSymbol_or_id(metadata: types.GetOptionContractSymbolOrIdMetadataParam): Promise<FetchResponse<200, types.GetOptionContractSymbolOrIdResponse200>> {
    return this.core.fetch('/v2/options/contracts/{symbol_or_id}', 'get', metadata);
  }

  /**
   * Serves the list of US treasuries available at Alpaca. The response is sorted by ISIN.
   *
   * @summary Get US treasuries
   * @throws FetchError<400, types.UsTreasuriesResponse400> One of the request parameters is invalid. See the returned message for details.
   *
   * @throws FetchError<429, types.UsTreasuriesResponse429> Too many requests. You hit the rate limit. Use the X-RateLimit-... response headers to
   * make sure you're under the rate limit.
   *
   */
  usTreasuries(metadata?: types.UsTreasuriesMetadataParam): Promise<FetchResponse<200, types.UsTreasuriesResponse200>> {
    return this.core.fetch('/v2/assets/fixed_income/us_treasuries', 'get', metadata);
  }

  /**
   * Serves the list of US corporates available at Alpaca. The response is sorted by ISIN.
   *
   * @summary Get US corporates
   * @throws FetchError<400, types.UsCorporatesResponse400> One of the request parameters is invalid. See the returned message for details.
   *
   * @throws FetchError<429, types.UsCorporatesResponse429> Too many requests. You hit the rate limit. Use the X-RateLimit-... response headers to
   * make sure you're under the rate limit.
   *
   */
  usCorporates(metadata?: types.UsCorporatesMetadataParam): Promise<FetchResponse<200, types.UsCorporatesResponse200>> {
    return this.core.fetch('/v2/assets/fixed_income/us_corporates', 'get', metadata);
  }

  /**
   * This endpoint is deprecated, please use [the new corporate actions
   * endpoint](https://docs.alpaca.markets/reference/corporateactions-1) instead.
   *
   * @summary Retrieve a Specific Announcement
   */
  getV2Corporate_actionsAnnouncementsId(metadata: types.GetV2CorporateActionsAnnouncementsIdMetadataParam): Promise<FetchResponse<200, types.GetV2CorporateActionsAnnouncementsIdResponse200>> {
    return this.core.fetch('/v2/corporate_actions/announcements/{id}', 'get', metadata);
  }

  /**
   * This endpoint is deprecated, please use [the new corporate actions
   * endpoint](https://docs.alpaca.markets/reference/corporateactions-1) instead.
   *
   * @summary Retrieve Announcements
   */
  getV2Corporate_actionsAnnouncements(metadata: types.GetV2CorporateActionsAnnouncementsMetadataParam): Promise<FetchResponse<200, types.GetV2CorporateActionsAnnouncementsResponse200>> {
    return this.core.fetch('/v2/corporate_actions/announcements', 'get', metadata);
  }

  /**
   * Lists wallets for the account given in the path parameter. If an asset is specified and
   * no wallet for the account and asset pair exists one will be created. If no asset is
   * specified only existing wallets will be listed for the account. An account may have at
   * most one wallet per asset.
   *
   * @summary Retrieve Crypto Funding Wallets
   */
  listCryptoFundingWallets(metadata?: types.ListCryptoFundingWalletsMetadataParam): Promise<FetchResponse<200, types.ListCryptoFundingWalletsResponse200>> {
    return this.core.fetch('/v2/wallets', 'get', metadata);
  }

  /**
   * Returns an array of all transfers associated with the given account across all wallets.
   *
   * @summary Retrieve Crypto Funding Transfers
   */
  listCryptoFundingTransfers(): Promise<FetchResponse<200, types.ListCryptoFundingTransfersResponse200>> {
    return this.core.fetch('/v2/wallets/transfers', 'get');
  }

  /**
   * Creates a withdrawal request. Note that outgoing withdrawals must be sent to a
   * whitelisted address and you must whitelist addresses at least 24 hours in advance. If
   * you attempt to withdraw funds to a non-whitelisted address then the transfer will be
   * rejected.
   *
   * @summary Request a New Withdrawal
   */
  createCryptoTransferForAccount(body: types.CreateCryptoTransferForAccountBodyParam): Promise<FetchResponse<200, types.CreateCryptoTransferForAccountResponse200>> {
    return this.core.fetch('/v2/wallets/transfers', 'post', body);
  }

  /**
   * Returns a specific wallet transfer by passing into the query the transfer_id.
   *
   * @summary Retrieve a Crypto Funding Transfer
   */
  getCryptoFundingTransfer(metadata: types.GetCryptoFundingTransferMetadataParam): Promise<FetchResponse<200, types.GetCryptoFundingTransferResponse200>> {
    return this.core.fetch('/v2/wallets/transfers/{transfer_id}', 'get', metadata);
  }

  /**
   * An array of whitelisted addresses
   *
   */
  listWhitelistedAddress(): Promise<FetchResponse<200, types.ListWhitelistedAddressResponse200>> {
    return this.core.fetch('/v2/wallets/whitelists', 'get');
  }

  /**
   * Request a new whitelisted address
   *
   */
  createWhitelistedAddress(body: types.CreateWhitelistedAddressBodyParam): Promise<FetchResponse<200, types.CreateWhitelistedAddressResponse200>> {
    return this.core.fetch('/v2/wallets/whitelists', 'post', body);
  }

  /**
   * Delete a whitelisted address
   *
   */
  deleteWhitelistedAddress(metadata: types.DeleteWhitelistedAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v2/wallets/whitelists/{whitelisted_address_id}', 'delete', metadata);
  }

  /**
   * Returns the estimated gas fee for a proposed transaction.
   *
   */
  getCryptoTransferEstimate(metadata?: types.GetCryptoTransferEstimateMetadataParam): Promise<FetchResponse<200, types.GetCryptoTransferEstimateResponse200>> {
    return this.core.fetch('/v2/wallets/fees/estimate', 'get', metadata);
  }

  /**
   * Lists wallets for the account given in the path parameter. If an asset is specified and
   * no wallet for the account and asset pair exists one will be created. If no asset is
   * specified only existing wallets will be listed for the account. An account may have at
   * most one wallet per asset
   *
   * @summary Retrieve Crypto Funding Wallets
   */
  listCryptoPerpFundingWallets(metadata?: types.ListCryptoPerpFundingWalletsMetadataParam): Promise<FetchResponse<200, types.ListCryptoPerpFundingWalletsResponse200>> {
    return this.core.fetch('/v2/perpetuals/wallets', 'get', metadata);
  }

  /**
   * Returns an array of all transfers associated with the given account across all wallets
   *
   * @summary Retrieve Crypto Funding Transfers
   */
  listCryptoPerpFundingTransfers(): Promise<FetchResponse<200, types.ListCryptoPerpFundingTransfersResponse200>> {
    return this.core.fetch('/v2/perpetuals/wallets/transfers', 'get');
  }

  /**
   * Creates a withdrawal request. Note that outgoing withdrawals must be sent to a
   * whitelisted address and you must whitelist addresses at least 24 hours in advance. If
   * you attempt to withdraw funds to a non-whitelisted address then the transfer will be
   * rejected
   *
   * @summary Request a New Withdrawal
   */
  createCryptoPerpTransferForAccount(body: types.CreateCryptoPerpTransferForAccountBodyParam): Promise<FetchResponse<200, types.CreateCryptoPerpTransferForAccountResponse200>> {
    return this.core.fetch('/v2/perpetuals/wallets/transfers', 'post', body);
  }

  /**
   * Returns a specific wallet transfer by passing into the query the transfer_id
   *
   * @summary Retrieve a Crypto Funding Transfer
   */
  getCryptoPerpFundingTransfer(metadata: types.GetCryptoPerpFundingTransferMetadataParam): Promise<FetchResponse<200, types.GetCryptoPerpFundingTransferResponse200>> {
    return this.core.fetch('/v2/perpetuals/wallets/transfers/{transfer_id}', 'get', metadata);
  }

  /**
   * An array of whitelisted addresses
   *
   */
  listWhitelistedPerpAddress(): Promise<FetchResponse<200, types.ListWhitelistedPerpAddressResponse200>> {
    return this.core.fetch('/v2/perpetuals/wallets/whitelists', 'get');
  }

  /**
   * Request a new whitelisted address
   *
   */
  createWhitelistedPerpAddress(body: types.CreateWhitelistedPerpAddressBodyParam): Promise<FetchResponse<200, types.CreateWhitelistedPerpAddressResponse200>> {
    return this.core.fetch('/v2/perpetuals/wallets/whitelists', 'post', body);
  }

  /**
   * Delete a whitelisted address
   *
   */
  deleteWhitelistedPerpAddress(metadata: types.DeleteWhitelistedPerpAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v2/perpetuals/wallets/whitelists/{whitelisted_address_id}', 'delete', metadata);
  }

  /**
   * Returns the estimated gas fee for a proposed transaction
   *
   */
  getCryptoPerpTransferEstimate(metadata?: types.GetCryptoPerpTransferEstimateMetadataParam): Promise<FetchResponse<200, types.GetCryptoPerpTransferEstimateResponse200>> {
    return this.core.fetch('/v2/perpetuals/wallets/fees/estimate', 'get', metadata);
  }

  /**
   * Retrieves the current leverage setting for the crypto perpetuals account, specific to a
   * given underlying asset. To use this endpoint, provide the 'symbol' of the asset as a
   * query parameter. The system will return the asset's symbol and the integer value
   * representing the current leverage applied to it within the account
   *
   * @summary Get Account Leverage for an Asset
   */
  getCryptoPerpAccountLeverage(metadata?: types.GetCryptoPerpAccountLeverageMetadataParam): Promise<FetchResponse<200, types.GetCryptoPerpAccountLeverageResponse200>> {
    return this.core.fetch('/v2/perpetuals/leverage', 'get', metadata);
  }

  /**
   * Updates the leverage for the crypto perpetuals account for a specific underlying asset.
   * Provide the 'symbol' of the asset and the desired 'leverage' (as an integer) using query
   * parameters. The system will return the asset's symbol and the newly set leverage value
   * upon successful update
   *
   * @summary Set Account Leverage for an Asset
   */
  setCryptoPerpAccountLeverage(metadata?: types.SetCryptoPerpAccountLeverageMetadataParam): Promise<FetchResponse<200, types.SetCryptoPerpAccountLeverageResponse200>> {
    return this.core.fetch('/v2/perpetuals/leverage', 'post', metadata);
  }

  /**
   * Fetches key financial metrics for the crypto perpetuals account, providing a snapshot of
   * its current status by detailing the relationship between the user's positions and their
   * collateral. The response includes maintenance margin (USDT), collateral balance (USDT),
   * total collateral (USDT), and profit/loss (USDT)
   *
   * @summary Retrieve Account Vitals
   */
  getCryptoPerpAccountVitals(): Promise<FetchResponse<200, types.GetCryptoPerpAccountVitalsResponse200>> {
    return this.core.fetch('/v2/perpetuals/account_vitals', 'get');
  }

  /**
   * This endpoint is used by an Authorized Participant to request the minting of a tokenized
   * asset.
   *
   * @summary Mint a Tokenized Asset
   * @throws FetchError<400, types.PostTokenizationMintResponse400> Bad request (e.g. malformed input, insufficient position, or account not authorized to
   * mint).
   * @throws FetchError<401, types.PostTokenizationMintResponse401> Authentication credentials are missing or invalid.
   * @throws FetchError<403, types.PostTokenizationMintResponse403> Caller is not authorized to perform this operation.
   * @throws FetchError<422, types.PostTokenizationMintResponse422> One or more request parameters are missing or invalid.
   */
  postTokenizationMint(body: types.PostTokenizationMintBodyParam): Promise<FetchResponse<200, types.PostTokenizationMintResponse200>> {
    return this.core.fetch('/v2/tokenization/mint', 'post', body);
  }

  /**
   * An Authorized Participant can use this endpoint to list the tokenization requests
   * performed on the Instant Tokenization Network (ITN).
   *
   * @summary List Tokenization Requests
   * @throws FetchError<401, types.GetTokenizationRequestsResponse401> Authentication credentials are missing or invalid.
   * @throws FetchError<403, types.GetTokenizationRequestsResponse403> Caller is not authorized to perform this operation.
   * @throws FetchError<422, types.GetTokenizationRequestsResponse422> One or more request parameters are missing or invalid.
   */
  getTokenizationRequests(metadata?: types.GetTokenizationRequestsMetadataParam): Promise<FetchResponse<200, types.GetTokenizationRequestsResponse200>> {
    return this.core.fetch('/v2/tokenization/requests', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AddAssetToWatchlistBodyParam, AddAssetToWatchlistByNameBodyParam, AddAssetToWatchlistByNameMetadataParam, AddAssetToWatchlistByNameResponse200, AddAssetToWatchlistMetadataParam, AddAssetToWatchlistResponse200, CalendarMetadataParam, CalendarResponse200, CalendarResponse400, CalendarResponse429, ClockMetadataParam, ClockResponse200, ClockResponse400, ClockResponse429, CreateCryptoPerpTransferForAccountBodyParam, CreateCryptoPerpTransferForAccountResponse200, CreateCryptoTransferForAccountBodyParam, CreateCryptoTransferForAccountResponse200, CreateWhitelistedAddressBodyParam, CreateWhitelistedAddressResponse200, CreateWhitelistedPerpAddressBodyParam, CreateWhitelistedPerpAddressResponse200, DeleteAllOpenPositionsMetadataParam, DeleteAllOpenPositionsResponse207, DeleteAllOrdersResponse207, DeleteOpenPositionMetadataParam, DeleteOpenPositionResponse200, DeleteOrderByOrderIdMetadataParam, DeleteWatchlistByIdMetadataParam, DeleteWatchlistByNameMetadataParam, DeleteWhitelistedAddressMetadataParam, DeleteWhitelistedPerpAddressMetadataParam, GetAccountActivitiesByActivityTypeMetadataParam, GetAccountActivitiesByActivityTypeResponse200, GetAccountActivitiesMetadataParam, GetAccountActivitiesResponse200, GetAccountConfigResponse200, GetAccountPortfolioHistoryMetadataParam, GetAccountPortfolioHistoryResponse200, GetAccountResponse200, GetAllOpenPositionsResponse200, GetAllOrdersMetadataParam, GetAllOrdersResponse200, GetCryptoFundingTransferMetadataParam, GetCryptoFundingTransferResponse200, GetCryptoPerpAccountLeverageMetadataParam, GetCryptoPerpAccountLeverageResponse200, GetCryptoPerpAccountVitalsResponse200, GetCryptoPerpFundingTransferMetadataParam, GetCryptoPerpFundingTransferResponse200, GetCryptoPerpTransferEstimateMetadataParam, GetCryptoPerpTransferEstimateResponse200, GetCryptoTransferEstimateMetadataParam, GetCryptoTransferEstimateResponse200, GetOpenPositionMetadataParam, GetOpenPositionResponse200, GetOptionContractSymbolOrIdMetadataParam, GetOptionContractSymbolOrIdResponse200, GetOptionContractSymbolOrIdResponse404, GetOptionsContractsMetadataParam, GetOptionsContractsResponse200, GetOrderByClientOrderIdMetadataParam, GetOrderByClientOrderIdResponse200, GetOrderByOrderIdMetadataParam, GetOrderByOrderIdResponse200, GetTokenizationRequestsMetadataParam, GetTokenizationRequestsResponse200, GetTokenizationRequestsResponse401, GetTokenizationRequestsResponse403, GetTokenizationRequestsResponse422, GetV2AssetsMetadataParam, GetV2AssetsResponse200, GetV2AssetsSymbolOrAssetIdMetadataParam, GetV2AssetsSymbolOrAssetIdResponse200, GetV2CorporateActionsAnnouncementsIdMetadataParam, GetV2CorporateActionsAnnouncementsIdResponse200, GetV2CorporateActionsAnnouncementsMetadataParam, GetV2CorporateActionsAnnouncementsResponse200, GetWatchlistByIdMetadataParam, GetWatchlistByIdResponse200, GetWatchlistByNameMetadataParam, GetWatchlistByNameResponse200, GetWatchlistsResponse200, LegacyCalendarMetadataParam, LegacyCalendarResponse200, LegacyCalendarResponse400, LegacyCalendarResponse429, LegacyClockResponse200, LegacyClockResponse429, ListCryptoFundingTransfersResponse200, ListCryptoFundingWalletsMetadataParam, ListCryptoFundingWalletsResponse200, ListCryptoPerpFundingTransfersResponse200, ListCryptoPerpFundingWalletsMetadataParam, ListCryptoPerpFundingWalletsResponse200, ListWhitelistedAddressResponse200, ListWhitelistedPerpAddressResponse200, OptionDoNotExerciseMetadataParam, OptionDoNotExerciseResponse403, OptionDoNotExerciseResponse422, OptionExerciseMetadataParam, OptionExerciseResponse403, OptionExerciseResponse422, PatchAccountConfigBodyParam, PatchAccountConfigResponse200, PatchOrderByOrderIdBodyParam, PatchOrderByOrderIdMetadataParam, PatchOrderByOrderIdResponse200, PostOrderBodyParam, PostOrderResponse200, PostTokenizationMintBodyParam, PostTokenizationMintResponse200, PostTokenizationMintResponse400, PostTokenizationMintResponse401, PostTokenizationMintResponse403, PostTokenizationMintResponse422, PostWatchlistBodyParam, PostWatchlistResponse200, RemoveAssetFromWatchlistMetadataParam, RemoveAssetFromWatchlistResponse200, SetCryptoPerpAccountLeverageMetadataParam, SetCryptoPerpAccountLeverageResponse200, SubscribeToActivitiesSseMetadataParam, SubscribeToActivitiesSseResponse200, UpdateWatchlistByIdBodyParam, UpdateWatchlistByIdMetadataParam, UpdateWatchlistByIdResponse200, UpdateWatchlistByNameBodyParam, UpdateWatchlistByNameMetadataParam, UpdateWatchlistByNameResponse200, UsCorporatesMetadataParam, UsCorporatesResponse200, UsCorporatesResponse400, UsCorporatesResponse429, UsTreasuriesMetadataParam, UsTreasuriesResponse200, UsTreasuriesResponse400, UsTreasuriesResponse429 } from './types';

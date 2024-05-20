export enum ErrorMessages {
    PageNotFound = 'The requested page could not be found',
    DisabledAccount = 'Your account has been disabled, please contact the customer support team for futher details.',
    Unauthenticated = 'An Authentication error occurred, please make sure you have access to the requested URL',
    InternalServerError = 'An error occurred in the server',
    OtherError = 'An error occurred, please check with system admin !',
    LocationDeactivateStockAvailable = 'Cannot deactivate location with stock on hand',
    LocationDeactivateChannelMapped = 'Cannot deactivate channel location',
    LocationDeactivateAll = 'Cannot deactivate all location',
    MissingTenantId = 'You have been logged out because of missing configuration. Please login again',
  }
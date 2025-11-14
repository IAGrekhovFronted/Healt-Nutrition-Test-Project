# SensorApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiDataGet**](#apidataget) | **GET** /api/data | |
|[**apiDataPost**](#apidatapost) | **POST** /api/data | |
|[**apiSensorsSummaryGet**](#apisensorssummaryget) | **GET** /api/sensors/summary | |

# **apiDataGet**
> Array<SensorData> apiDataGet()


### Example

```typescript
import {
    SensorApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SensorApi(configuration);

const { status, data } = await apiInstance.apiDataGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SensorData>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiDataPost**
> apiDataPost()


### Example

```typescript
import {
    SensorApi,
    Configuration,
    SensorData
} from './api';

const configuration = new Configuration();
const apiInstance = new SensorApi(configuration);

let sensorData: SensorData; // (optional)

const { status, data } = await apiInstance.apiDataPost(
    sensorData
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sensorData** | **SensorData**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSensorsSummaryGet**
> apiSensorsSummaryGet()


### Example

```typescript
import {
    SensorApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SensorApi(configuration);

const { status, data } = await apiInstance.apiSensorsSummaryGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


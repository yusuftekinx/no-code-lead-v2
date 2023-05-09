

interface BaseRouteType {
    path: string;
    component: React.FunctionComponent;
    layout?: React.FunctionComponent;
    private?: boolean;
}

export interface RouteType extends BaseRouteType{
    subRoutes?: BaseRouteType[];
}
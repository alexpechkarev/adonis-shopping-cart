export default class MapStorage {
    protected session: any;
    constructor(session: any);
    /**
     * Get Cart Parameter
     * @param param
     * @returns
     */
    get(param: string): any;
    /**
     * Store Cart parameter
     * @param param
     * @param item
     */
    put(param: any, item: any): void;
    /**
     * Delete Cart parameter
     * @param param
     */
    forget(param: any): void;
}

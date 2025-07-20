export namespace main {
	
	export class Beatmap {
	    filename: string;
	    download_url: string;
	
	    static createFrom(source: any = {}) {
	        return new Beatmap(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.filename = source["filename"];
	        this.download_url = source["download_url"];
	    }
	}
	export class BeatmapPage {
	    data: Beatmap[];
	    count: number;
	    total: number;
	    page: number;
	    pageCount: number;
	
	    static createFrom(source: any = {}) {
	        return new BeatmapPage(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.data = this.convertValues(source["data"], Beatmap);
	        this.count = source["count"];
	        this.total = source["total"];
	        this.page = source["page"];
	        this.pageCount = source["pageCount"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DeviceDetails {
	    manufacturer: string;
	    model: string;
	    serial_no: string;
	    build_date: string;
	    battery_level: string;
	    used_space: string;
	    total_space: string;
	
	    static createFrom(source: any = {}) {
	        return new DeviceDetails(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.manufacturer = source["manufacturer"];
	        this.model = source["model"];
	        this.serial_no = source["serial_no"];
	        this.build_date = source["build_date"];
	        this.battery_level = source["battery_level"];
	        this.used_space = source["used_space"];
	        this.total_space = source["total_space"];
	    }
	}

}


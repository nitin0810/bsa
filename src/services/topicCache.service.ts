import { Injectable } from '@angular/core';


@Injectable()
export class TopicCacheService {

    private topicsCacheData: any;

    cacheTopicData(id: number, data: any) {

        this.topicsCacheData = this.topicsCacheData || {};
        this.topicsCacheData[id] = data;
    }

    getCachedTopicDataById(id: number) {

        return (this.topicsCacheData && this.topicsCacheData[id]) || null;
    }

    clearCachedData(){
        
        this.topicsCacheData = null;
    }

}
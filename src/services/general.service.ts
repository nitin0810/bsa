import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class GeneralService {

    topicWiseData: any;
    templatesInfo: any;//object to map the template name from server to template page name at client side


    constructor(private http: CustomHttpService) {

        this.setTemplatesInfo();
    }

    setTemplatesInfo() {
        this.templatesInfo = {
            "FIRST": "Template_1",
            "SECOND": "Template_2",
            "THIRD": "Template_3",
            "FOURTH": "Template_4"
        }
    }

    getTemplatePageName(serverSideName: string) {

        return this.templatesInfo[serverSideName];
    }

    getCourseCategories() {

        return this.http.get('/categories');
    }

    getMyCoursesInfo() {

        return this.http.get('/employee/courses');
    }

    getTopicData(templateName:string,record:number){
        return this.http.get(`/employee/template/${templateName}/record/${record}`);
        
    }

    storeCoursesDetails(coursesDetails: Array<any>) {

        localStorage.setItem('coursesDetails', JSON.stringify(coursesDetails));
    }

    storeTopicwiseData(course: any) {

        this.topicWiseData = {};
        
        course.chapters.forEach((chapter: any) => {
            chapter.topics.forEach((topic: any, tIndex: number, topics: Array<any>) => {

                if (topic.pages[0]) {
                    this.topicWiseData[topic.topicId] = {};
                    this.topicWiseData[topic.topicId].template = topic.pages[0].template;
                    this.topicWiseData[topic.topicId].record=  topic.pages[0].record;
                    this.topicWiseData[topic.topicId].topicId = topic.topicId;
                    this.topicWiseData[topic.topicId].topicName = topic.topic;
                    this.topicWiseData[topic.topicId].chapterName = chapter.chapter;
                    this.topicWiseData[topic.topicId].chapterId = chapter.chapterId;
                    this.topicWiseData[topic.topicId].prevTopicId = tIndex == 0 ? null : topics[tIndex - 1].topicId;
                    this.topicWiseData[topic.topicId].nextTopicId = tIndex == (topics.length - 1) ? null : topics[tIndex + 1].topicId;

                }
            });
        });

        console.log(this.topicWiseData);
    }



    getDataByTopicId(id: number) {
        return this.topicWiseData[id];
    }

}
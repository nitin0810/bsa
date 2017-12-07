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
            "SECOND":"Template_2"
        }
    }

    getTemplatePageName(serverSideName: string) {

        return this.templatesInfo[serverSideName];
    }

    getMyCoursesPageInfo() {

        return this.http.get('/category');
    }

    storeCoursesDetails(coursesDetails: Array<any>) {

        localStorage.setItem('coursesDetails', JSON.stringify(coursesDetails));
    }

    storeTopicwiseData(categories: Array<any>) {

        this.topicWiseData = {};

        categories.forEach((catg: any) => {
            catg.courses.forEach((course: any) => {
                course.chapters.forEach((chapter: any) => {
                    chapter.topics.forEach((topic: any) => {
                        topic.pages[0] && (this.topicWiseData[topic.topicId] = topic.pages[0].data);
                    });
                });
            });

        });

        // console.log(this.topicWiseData);
    }

    getDataByTopicId(id: number) {
        return this.topicWiseData[id];
    }

}
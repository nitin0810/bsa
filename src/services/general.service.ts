import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class GeneralService {

    coursesProgressData: any;
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


    storeCoursesProgress(categories: Array<any>) {
        this.coursesProgressData = {};

        categories.forEach((catg: any) => {
            catg.courses.forEach((course: any) => {

                this.coursesProgressData[course.courseId] = {};
                this.coursesProgressData[course.courseId].totalTopics = course.totalTopics;
                this.coursesProgressData[course.courseId].topicViewed = course.topicViewed;
                this.coursesProgressData[course.courseId].courseProgress = this.getProgressPercentage(course.totalTopics, course.topicViewed);
            });
        });
        // console.log("CourseProgressData",this.coursesProgressData);
    }

    getProgressPercentage(total: number, viewed: number) {

        return Math.round((viewed / total) * 100);
    }

    getCourseProgressById(id: number) {

        return this.coursesProgressData[id];
    }

    updateCourseProgressById(id: number) {

        this.coursesProgressData[id].topicViewed++;
        this.coursesProgressData[id].courseProgress = this.getProgressPercentage(this.coursesProgressData[id].totalTopics, this.coursesProgressData[id].topicViewed);
    }




    getTopicData(templateName: string, record: number, topicId: number) {

        return this.http.get(`/employee/topic/${topicId}/template/${templateName}/record/${record}`);
    }

    // storeCoursesDetails(coursesDetails: Array<any>) {

    //     localStorage.setItem('coursesDetails', JSON.stringify(coursesDetails));
    // }

    storeTopicwiseData(course: any) {

        this.topicWiseData = {};

        course.chapters.forEach((chapter: any) => {
            chapter.topics.forEach((topic: any, tIndex: number, topics: Array<any>) => {

                if (topic.pages[0]) {
                    this.topicWiseData[topic.topicId] = {};
                    this.topicWiseData[topic.topicId].template = topic.pages[0].template;
                    this.topicWiseData[topic.topicId].record = topic.pages[0].record;
                    this.topicWiseData[topic.topicId].topicId = topic.topicId;
                    this.topicWiseData[topic.topicId].topicName = topic.topic;
                    this.topicWiseData[topic.topicId].read = topic.read;
                    this.topicWiseData[topic.topicId].chapterName = chapter.chapter;
                    this.topicWiseData[topic.topicId].chapterId = chapter.chapterId;
                    this.topicWiseData[topic.topicId].courseId = course.courseId;
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

    updateTopicReadStatus(id: number) {
        this.topicWiseData[id].read = true;
    }

}
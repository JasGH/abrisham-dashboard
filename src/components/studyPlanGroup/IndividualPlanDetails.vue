<template>
  <v-expansion-panels
    v-model="openedPanel"
    flat
    multiple
  >
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div class="plan-details">
          <v-card
            v-for="(item,index) in selectedPlan"
            :key="index"
            elevation="0"
          >
            <v-sheet
              v-if="item.start !== null"
              class="plan-sheet"
            >
              <v-row>
                <v-col class="text-right plan-sheet-title-1">
                  از ساعت {{ item.start.substr(0, 5) }}
                </v-col>
                <v-col class="plan-sheet-title-2">
                  {{ item.title }}
                </v-col>
                <v-col class="text-left plan-sheet-title-3">
                  تا ساعت {{ item.end.substr(0, 5) }}
                </v-col>
              </v-row>
            </v-sheet>
            <v-card
              v-for="(content, id) in item.contents.list"
              :key="id"
              class="plan-sheet-details"
              elevation="0"
            >
              <v-row>
                <v-col
                  v-if="content.content_type.name === 'video'"
                  v-ripple
                  class="plan-sheet-details-card"
                  @click="contentClicked(content)"
                >
                  <v-card
                    elevation="0"
                  >
                    <v-col class="text-right plan-sheet-details-title">
                      فیلم ها
                    </v-col>
                    <v-col
                      v-ripple
                      class="text-right plan-sheet-details-video"
                      hover
                      @click="contentClicked(content.content_id)"
                    >
                      <div class="plan-sheet-details-video-box">
                        <div>
                          <v-card
                            elevation="0"
                            class="plan-sheet-details-video-thumbnail"
                            hover
                            @click="contentClicked(content.content_id)"
                          >
                            <v-img :src="content.photo" />
                          </v-card>
                        </div>
                        <div>
                          <v-card
                            elevation="0"
                            class="plan-sheet-details-video-title"
                            hover
                          >
                            {{ content.title }}
                            فیلم جلسه 5 - حل تست فرسنگ ششم (قسمت فیلانقحخغنتحخفغنتخنتخنتختتلبرالزلزاعالنتلدذنتبلدنبتذدبلد
                          </v-card>
                        </div>
                      </div>
                    </v-col>
                  </v-card>
                </v-col>
                <v-col
                  v-if="content.content_type.name === 'voice'"
                  class="text-right plan-sheet-details-voice"
                >
                  <!--                  v-if="content.content_type.name === 'voice'"-->
                  <v-card elevation="0">
                    <v-col class="text-right plan-sheet-details-title">
                      تایتل صدا
                    </v-col>
                    <v-card
                      class="plan-sheet-details-voice-card"
                    >
                      <audio
                        controls
                        class="plan-sheet-details-voice-audio"
                      >
                        <source
                          :src="content.voice"
                          type="audio/ogg"
                        >
                        <source
                          :src="content.voice"
                          type="audio/mpeg"
                        >
                        مرورگر شما از پخش کننده صدا پشتیبانی نمیکند.
                      </audio>
                    </v-card>
                  </v-card>
                </v-col>
                <v-col
                  v-if="content.description !== null"
                  class="plan-sheet-details-card"
                  cols="12"
                >
                  <v-card elevation="0">
                    <v-col class="text-right plan-sheet-details-title">
                      توضیحات
                    </v-col>
                    <v-col class="text-right plan-sheet-details-info">
                      {{ content.description }}
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  props:{
  selectedPlan: {
    type: Array,
    default(){
      return []
    }
    },
  openedPanel:{
    type: Array,
    default(){
      return []
    }
  }
  },
  methods:{
    // showSelectedPlan(){
    //   console.log('plaaaaaaaan',this.selectedPlan)
    // },
    contentClicked(content){
      this.$emit('contentClicked' , content )
      console.log('selectedContent' , content)
    }
  },
  created() {
     // console.log('وضعیت کانتنت',this.selectedPlan[0].contents.list[0].content_type.name)
    // the content type : this.selectedPlan[0].contents.list[0].content_type.name
    // the content photo : this.selectedPlan[0].contents.list[0].photo
    // the content title : this.selectedPlan[0].contents.list[0].title
  }
}
</script>
<style>
.plan-details {
  border-radius: 10px;
}
.theme--light.v-sheet .plan-sheet {
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  background-color: #eff3ff;
  color: #3e5480;
  border-color: #FFFFFF;
  padding-top: 7px;
  padding-bottom: 5px;
  border-radius: 10px;
}
.v-card > :last-child:not(.v-btn):not(.v-chip):not(.v-avatar) {
  border-radius: 10px;
}
.v-card > :first-child:not(.v-btn):not(.v-chip):not(.v-avatar), .v-card > .v-card__progress + :not(.v-btn):not(.v-chip):not(.v-avatar) {
  border-radius: 10px;
}
.plan-details .plan-sheet .plan-sheet-title-1{
  padding-right: 60px;
}
.plan-details .plan-sheet .plan-sheet-title-3{
  padding-left: 60px;
}
.plan-sheet-details {
  margin-top: 12px;
  margin-right: 10px;
}
.plan-sheet-details-title {
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3e5480;
}
.plan-sheet-details-info{
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #3e5480;
  /*overflow-y: scroll;
  padding-top: 22px;
  */
}
.plan-sheet-details-card{
  padding-right: 0px;
}
.plan-sheet-details-video {
  padding-bottom: 18px;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #eff3ff;
}
.theme--light.v-card .plan-sheet-details-voice-card{
  border-radius: 40px !important;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  height: 40px;
  margin-top: 10px;
}
.plan-sheet-details-voice{
  padding-top: 22px;
  padding-right: 0px;
}
.theme--light.v-card .plan-sheet-details-video-thumbnail{
  border-radius: 10px;
  background-color: #ffceab;
  height: 42px;
  width: 72px;
  margin-top: 9px;
}
.theme--light.v-card .plan-sheet-details-video-title{
  overflow: hidden;
  text-overflow: ellipsis;
  height: 25px;
  width: 600px;
  white-space:nowrap;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: normal;
  text-align: right;
  color: #3e5480;
  background-color: #eff3ff;
  padding-right: 10px;
}
.plan-sheet-details-video-box{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.plan-sheet-details-voice-audio{
  width: 100%;
  height: 40px;
  border-radius: 40px !important;

}
.plan-details .theme--light.v-image {
  border-radius: 5px !important;
}
@media only screen and (max-width: 1200px) {
  .plan-sheet-details-title {
    padding-bottom: 0;
  }

  .plan-sheet-details-card .plan-sheet-details-info {
    padding-top: 0;
    padding-right: 0;
  }
}
@media only screen and (max-width: 990px){
  .plan-sheet-details-title {
    display: none;
  }
  .theme--light.v-card .plan-sheet-details-video-title {
    width: 331px;
    padding-top: 8px;
    height: 50px;
  }
  .plan-sheet-details-video{
    padding-top: 0px;
    padding-bottom: 0;
  }
  .theme--light.v-card .plan-sheet-details-video-thumbnail {
    height: 30px;
    width: 64px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .plan-details .v-responsive__sizer {
    padding-bottom: 30px !important;
  }
  .plan-details .v-expansion-panel-content__wrap {
    padding-right: 24px;
    padding-left: 24px;
  }
}
@media only screen and (max-width: 768px){

  .theme--light.v-card .plan-sheet-details-video-thumbnail {
    height: 30px;
    width: 54px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 3px;
  }
  .theme--light.v-card .plan-sheet-details-voice-card {
    height: 40px;
  }
  .plan-sheet-details-voice {
    padding-top: 10px;
    padding-bottom: 0px;
  }
  .plan-sheet-details-info {
    font-size: 12px;
  }
  .plan-sheet-details-card {
    padding-right: 0px;
    padding-top: 10px;
    padding-bottom: 5px;
  }
  .plan-sheet-details-card .plan-sheet-details-info {
    padding-bottom: 0;
  }
  .v-expansion-panel-content__wrap {
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 10px;
  }
  .plan-details .plan-sheet .plan-sheet-title-1 {
    padding-right: 28px;
  }
  .plan-details .plan-sheet .plan-sheet-title-3 {
    padding-left: 28px;
  }
  .v-expansion-panel-content__wrap {
    padding-right: 6px;
    padding-left: 6px;
  }
  .theme--light.v-sheet .plan-sheet {
    font-size: 12px;
  }
  .theme--light.v-card .plan-sheet-details-video-title {
    padding-top: 0px;
    font-size: 12px;
    width: 221px;
    height: 26px;
  }
  .theme--light.v-card .plan-sheet-details-video-thumbnail {
    height: 30px;
  }
  responsive__sizer {
    padding-bottom: 30px !important;
  }
}
@media only screen and (max-width: 578px){
  .study-plan .major-card {
    margin-right: 182px;
  }
}
@media only screen and (max-width: 406px){
  .theme--light.v-card .plan-sheet-details-video-title {
    width: 120px;
  }
}
</style>

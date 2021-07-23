<template>
  <div>
    <div class="timeTable">
      <div class="timeTable-header">
        <div class="timeTable-header-number-boxes">
          <div
            v-if="canShowTimeTableHeader(startTime)"
            class="timeTableHeader"
            :style="{ flex: ('0 0 ' + customizedHeaderWidth() + 'px') }"
          />
          <div
            v-for="i in timeArray"
            :key="i"
            class="timeTableHeader"
            :style="{ flex: ('0 0 ' + headerWidth + 'px') }"
          >
            <v-row>
              <v-col>
                <div class="timeTableHeaderNumber">
                  {{ i }}
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div
        v-if="!loading"
        class="timeTable-body"
      >
        <div
          v-for="i in timeArray"
          :key="i"
          :style="{ flex: ('0 0 ' + headerWidth + 'px') }"
        >
          <div class="timeTable-main-line" />
          <div class="timeTable-line" />
        </div>
        <div
          v-for="p in plansOfSelectedMajor"
          :key="p.id"
          class="plan"
          :style="{
            right: calcPosition(p.start, p.end).right,
            width: calcPosition(p.start, p.end).width
          }"
          @click="showPlanDetails(p.id)"
        >
          <div
            class="plan-within-box"
            :style="{
              right: calcPosition(p.start, p.end).right,
              width: calcPosition(p.start, p.end).width,
              backgroundColor: p.backgroundColor,
              borderColor: p.borderColor,
              color: p.textColor
            }"
          >
            {{ p.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Major from '../../Models/Major'
import {PlanList} from '../../Models/Plan'

export default {
    name: 'TimeScheduleTable',
    props: {
        headerWidth: {
            default: 200,
          type: Number
        },
        startTime: {
            default: '00:00:00',
          type: String
        },
        endTime: {
            default: '24:00:00',
          type: String
        },
        plans: {
          type: PlanList,
          default: new PlanList(),
        },
      loading: {
        default: () => {
          return false
        },
        type: Boolean
      },
      selectedMajor: {
            default() {
              return new Major({
                id: 1,
                name: 'ریاضی'
              })
            },
          type: Major
        }
    },
    data() {
        return {
            timeArray: []
        }
    },
    computed: {
        plansOfSelectedMajor() {
            return this.plans.list.filter(item => parseInt(item.major.id) === parseInt(this.selectedMajor.id))
        }
    },
    created() {
      // console.log('plans  ',this.plans)
        const totalTime = this.clockToSeconds(this.endTime).hour - this.calcStartDay(this.clockToSeconds(this.startTime))

        for (var i = 0; i < totalTime + 1; i++) {
            this.timeArray.push(this.calcStartDay(this.clockToSeconds(this.startTime)) + i)
        }
    },
    methods: {
        showPlanDetails(id) {
          const selectedPlan = this.plans.list.filter(item => parseInt(item.id) === parseInt(id))
          this.$emit('planClicked' , selectedPlan)
        },
        timeToPixel(time) {
            return (this.headerWidth * time) / 3600
        },
        canShowTimeTableHeader(time) {
            return (this.clockToSeconds(time).minutes !== 0 || this.clockToSeconds(time).seconds !== 0)
        },
        customizedHeaderWidth() {
            if (this.clockToSeconds(this.startTime).minutes !== 0 || this.clockToSeconds(this.startTime).seconds !== 0) {
                return (
                    this.calcStartDay(this.clockToSeconds(this.startTime)) * 3600 -
                    this.clockToSeconds(this.startTime).totalSeconds
                ) * this.headerWidth / 3600
            } else {
                return this.headerWidth
            }
        },
        clockToSeconds(time) {
            const [hh = '0', mm = '0', ss = '0'] = (time || '0:0:0').split(':');
            const hour = parseInt(hh, 10) || 0;
            const minute = parseInt(mm, 10) || 0;
            const second = parseInt(ss, 10) || 0;
            return {
                totalSeconds: (hour * 3600) + (minute * 60) + (second),
                minutes: minute,
                hour: hour,
                seconds: second
            }
        },
        calcStartDay(startDaySeconds) {
            if (startDaySeconds.minutes === 0 && startDaySeconds.seconds === 0) {
                return startDaySeconds.hour
            } else {
                return startDaySeconds.hour + 1
            }
        },
        calcPosition(start, end) {
            const startSeconds = this.clockToSeconds(start).totalSeconds
            const endSeconds = this.clockToSeconds(end).totalSeconds
            const right = ((startSeconds - this.clockToSeconds(this.startTime).totalSeconds) * (this.headerWidth / 3600)).toString() + 'px'
            const width = ((endSeconds - startSeconds) * (this.headerWidth) / 3600).toString() + 'px'

            return {right: right, width: width}
        }
    }
}
</script>

<style scoped>
.plans {
    background: white;
}

.plan {
    position: absolute;
    /*border: 1px solid;*/
    cursor: pointer;
    border-radius: 10px;
    text-align: center;
  top: 0;
  height: 100%;
  padding-top: 64px;
}

.plan-within-box{
  border-radius: 10px;
}

.timeTable {
    position: relative;
    overflow-x: scroll;
    overflow-y: hidden;
    background-color: white;
  top: 3px;
}

.timeTable-header-number-boxes,
.timeTable-body {
    display: flex;
}

.timeTable-header{
  position: relative;
  right: 0.4px;
}

.timeTableHeader {
    padding: 5px 0;
    text-align: center;
    line-height: 48px;
    background-color: rgba(225, 240, 255, 1);
}

.timeTableHeader:last-child {
  padding-left: 20px;
}

.timeTableHeaderNumber {
  position: relative;
  background-color: white;
  width: 30px;
  height: 30px;
  right: 38px;
  border-radius: 50%;
  padding: 5px 7px 1px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #333333;
}

.timeTable-body {
    background-color: white;
    height: 70px;
}
.timeTable-main-line{
  position: relative;
  border-left: solid 2px #e1f0ff;
  height: 70px;
  right: -146px;
}
.timeTable-line{
  display: inline-block;
  position: relative;
  border-left: solid 1px #e1f0ff;
  height: 70px;
  right: -49px;
  bottom: 70px;
}
@media only screen and (max-width: 767px) {
    .timeTable {
        border-radius: 0;
    }
  .timeTable-main-line{
    height: 37px;
  }
  .plan {
    padding-top: 47px;
  }
  .timeTable-body {
    height: 36px;
  }
  .plan-within-box {
    border-radius: 8px;
  }

}
</style>


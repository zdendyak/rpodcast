<template>
    <v-container grid-list-lg>
        <v-layout row>
            <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5">{{ title }}</v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="rpod in rpodList" :key="rpod.id">
                <rpod-card :rpod="rpod"></rpod-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import RpodCard from './RpodCard'

export default {
    name: 'rpod-list',
    components: {
      RpodCard
    },
    props: {
        title: {
            type: String,
            default: 'Available Podcasts'
        },
        rpods: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            rpod: {
                title: 'Top western road trips',
                description: "I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.",
                imageUrl: 'image/listen4.jpg',
                audio: '',
                user: {
                    id: 'u111w434',
                    name: 'John Doe',
                }
            }
        }
    },
    computed:  {
        defaultRpods () {
            return [1,2,3,4,5,6].map(id => Object.assign({}, this.rpod, { 
                id
            }));
        },
        rpodList () {
            return this.rpods.length ? this.rpods : this.defaultRpods
        }
    }
};
</script>

<style scoped>

</style>
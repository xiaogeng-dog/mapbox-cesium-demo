<style lang="less" scoped>
@import '../../../base.less';
.sider-menu {
  text-align: left;
  font-size: 2rem;
  overflow: auto;
  .menu-item-title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;/**不换行**/
    display: inline-block;
  }
  .menu-slected {
    background-color: @theme-color!important;
    color: @white !important;
  }
}
</style>

<template>
  <div class="sider-menu">
    <Menu :accordion="true" theme="dark" :open-names="openNames" width="200" :active-name="activeName" @on-select="menuSlected" @on-open-change="openChange">
      <template v-for="(menu_1, index) in menuList">
        <template v-if="!menu_1.children">
          <MenuItem :name="menu_1.name" :key="'menu_1_' + index"
            :class="[activeName === menu_1.name ? 'menu-slected' : '']"
            :title="menu_1.title">
            <span class="menu-item-title"><Icon :type="menu_1.icon" />&nbsp;&nbsp;&nbsp;{{menu_1.title}}</span>
          </MenuItem>
        </template>
        <template v-else-if="menu_1.children && menu_1.children.length === 1 && (!menu_1.children[0].children || menu_1.children[0].children.length === 0)">
          <MenuItem :name="menu_1.children[0].name" :key="'menu_1_' + index"
            :class="[activeName === menu_1.children[0].name ? 'menu-slected' : '']"
            :title="menu_1.children[0].title">
            <span class="menu-item-title"><Icon :type="menu_1.children[0].icon" />&nbsp;&nbsp;&nbsp;{{menu_1.children[0].title}}</span>
          </MenuItem>
        </template>
        <template v-else-if="menu_1.children && menu_1.children.length >= 1">
          <Submenu :name="menu_1.name" :key="'menu_1_' + index">
            <template slot="title">
              <span class="menu-item-title">
                <Icon :type="menu_1.icon" />&nbsp;{{menu_1.title}}
              </span>
            </template>
            <template v-for="(menu_2, index) in menu_1.children">
              <template v-if="menu_2.children && menu_2.children.length > 0">
                <Submenu :name="menu_2.name" :key="'menu_2_' + index">
                  <template slot="title">
                    <span class="menu-item-title">
                      <Icon :type="menu_2.icon" />&nbsp;{{menu_2.title}}
                    </span>
                  </template>
                  <template v-for="(menu_3, index) in menu_2.children">
                    <MenuItem :name="menu_3.name" :key="'menu_3_' + index" :title="menu_3.title">
                      <span class="menu-item-title"><Icon :type="menu_3.icon" />&nbsp;{{menu_3.title}}</span>
                    </MenuItem>
                  </template>
                </Submenu>
              </template>
              <template v-else>
                <MenuItem :name="menu_2.name" :key="'menu_2_' + index" :title="menu_2.title">
                  <span class="menu-item-title"><Icon :type="menu_2.icon" />&nbsp;{{menu_2.title}}</span>
                </MenuItem>
              </template>
            </template>
          </Submenu>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    menuList: {
      type: Array
    },
    openNames: {
      type: Array
    }
  },
  computed: {
    activeName () {
      return this.$route.name
    }
  },
  methods: {
    menuSlected (name) {
      if (!!name && this.$route.name !== name) {
        this.$router.push({ name })
      }
    },
    openChange (openNames) {
      this.$store.commit('app/setCurrentMenuOpenNames', openNames)
    }
  }
}
</script>

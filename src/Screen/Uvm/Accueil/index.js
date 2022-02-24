import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  BounceInRight,
  Transition,
} from "react-native-reanimated";

import { AntDesign } from "@expo/vector-icons";

import Layout from "../../../Utils/Layout";

import { Chip } from "react-native-paper";
import { FiltreCategory } from "../../../Utils/filter";
import FilteredView from "../../../Views/UvmAccueil/FilteredView";
import CategorieData from "../../../Data/master.json";

const Data = [
  {
    id: "1",
    name: "DUT",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "2",
    name: "BTS",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "3",
    name: "Bachelor",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "4",
    name: "Licence",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "5",
    name: "Master",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "6",
    name: "MBA",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
  {
    id: "7",
    name: "Certification",
    icon: "https://don.clusterdigitalafrica.com/upload/images/categorie/default.png",
  },
];

const AccueilUvm = ({ navigation }) => {
  const [IsActive, setIsActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredData, setfilteredData] = useState(null);

  useEffect(() => {
    setLoading(true);
    setfilteredData(FiltreCategory(CategorieData, filter));
    setLoading(false);
    return () => {
      setfilteredData(null);
    };
  }, [filter]);
  return (
    <Layout
      navigation={navigation}
      icon={require("../../../../assets/banner_cours.jpg")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text style={styles.titre}>Categorie</Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "black",
              opacity: 0.8,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chip}
      >
        {Data.map((item, index) => {
          return (
            <Chip
              selectedColor="black"
              selected={IsActive == index ? true : false}
              style={styles.chipItem}
              avatar={
                <Image
                  source={{ uri: `${item.icon}` }}
                  style={{ backgroundColor: "orange" }}
                />
              }
              onPress={() => {
                setIsActive(index);

                item.name.toLowerCase() === filter.toLowerCase()
                  ? null
                  : setFilter(item.name.toLocaleLowerCase());
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "800",
                  fontSize: 15,
                  letterSpacing: -1,
                }}
              >
                {item.name}
              </Text>
            </Chip>
          );
        })}
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* {filter === "" && (
          <Animated.View
            exiting={FadeOutLeft}
            entering={BounceInRight}
            layout={Transition}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tester</Text>
            </View>
          </Animated.View>
        )} */}
        {filteredData ? (
          loading ? (
            <Animated.View
              exiting={FadeOutLeft}
              entering={BounceInRight}
              layout={Transition}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <ActivityIndicator size="large" color="lightgreen" />
            </Animated.View>
          ) : (
            <FilteredView data={filteredData} navigation={navigation} />
          )
        ) : null}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contain: {
    flexGrow: 1,
  },
  titre: {
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 0,
    color: "black",
  },
  chip: {
    flexDirection: "row",
    padding: 2,
    flexGrow: 1,
    height: 50,
  },
  chipItem: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 2,
    minWidth: 100,
    maxWidth: 150,
  },
});
export default AccueilUvm;
